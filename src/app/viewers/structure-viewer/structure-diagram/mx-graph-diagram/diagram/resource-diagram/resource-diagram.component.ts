import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {DiagramNode} from "../DiagramNode";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ConfigurationService} from "../../../../../../services/infrastructure/configuration.service";
import {StructureDefinitionService} from "../../../../../../services/structure-definition.service";
import {switchMap} from "rxjs/operators";
import {DiagramNodeElement} from "../DiagramNodeElement";
import {DiagramConnection} from "../DiagramConnection";
import StructureDefinition = fhir.StructureDefinition;

@Component({
  selector: 'app-resource-diagram',
  templateUrl: './resource-diagram.component.html',
  styleUrls: ['./resource-diagram.component.css']
})
export class ResourceDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') graphContainer: ElementRef;
  structureDefinition: StructureDefinition;
  graph: mxGraph;
  private headerStyle = "font-size: 1.2em; font-weight: bold; color: white;background-color: #204e5f; height: 100%; padding-bottom: 8px;padding-top: 8px;margin:0";
  private elementStyle = "margin-left: 4px; margin-right: 4px;text-align: left; color: black";
  private $resource: Observable<any>;
  private nodes: Map<string, DiagramNode>;

  constructor(private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService) {
  }

  ngOnInit() {
    this.configurationService.serverChanged.subscribe(() => this.calculateElements());
    this.calculateElements();
  }

  calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));


    this.$resource.subscribe(value => {
      this.nodes = new Map<string, DiagramNode>();
      this.structureDefinition = value.resource;
      let parentNode = new DiagramNode();
      parentNode.isParent = true;
      parentNode.title = this.structureDefinition.title;
      parentNode.min = 1;
      parentNode.max = "1";

      if (this.structureDefinition.snapshot) {
        let elementDefinitions = this.structureDefinition.snapshot.element;
        for (let i = 0; i < elementDefinitions.length; i++) {
          const elementDefinition = elementDefinitions[i];
          if (elementDefinition.type != null) {
            const elementType = elementDefinition.type[0];
            if (elementType.code === 'BackboneElement') {
              let diagramNode = new DiagramNode();
              let connection = new DiagramConnection();
              connection.source = parentNode;
              connection.target = diagramNode;
              connection.label = elementDefinition.sliceName;
              connection.sourceCardinality = "" + elementDefinition.min;
              connection.targetCardinality = elementDefinition.max;
              diagramNode.connection = connection;
              diagramNode.title = elementDefinition.sliceName;
              diagramNode.min = elementDefinition.min;
              diagramNode.max = elementDefinition.max;
              diagramNode.short = elementDefinition.short;
              diagramNode.path = elementDefinition.path;
              console.log('adding element: ' + elementDefinition.path + ' new size: ' + this.nodes.size);
              this.nodes.set(elementDefinition.path, diagramNode);
              this.calculateChildren(elementDefinition.path, diagramNode);
            } else {
              if (!this.nodes.has(elementDefinition.path)) {
                this.calculateChildren(this.structureDefinition.title, parentNode);
                this.nodes.set(this.structureDefinition.title, parentNode);
              }
            }
          }
        }
      }
      console.log(this.nodes);
      this.createGraph();
    });
  }

  computeLevel(path: string): number {
    if (path == null) {
      return 0;
    }
    const match = path.match(/\./g);
    return (match || []).length;
  }

  stripUrl(referenceUrl: any) {
    if (referenceUrl == '') {
      return '';
    }
    if (referenceUrl instanceof Array) {
      return referenceUrl[0].split('/').pop();
    }

    return referenceUrl.split('/').pop().trim();
  }

  calculateChildren(path: string, diagramNode: DiagramNode) {
    if (this.structureDefinition.snapshot) {
      let elementDefinitions = this.structureDefinition.snapshot.element;
      diagramNode.elements = [];
      console.log('now adding elements to ' + path);
      for (let i = 0; i < elementDefinitions.length; i++) {
        const elementDefinition = elementDefinitions[i];
        let elementLevel = this.computeLevel(elementDefinition.path);
        let pathLevel = this.computeLevel(path);
        // cannot use startswith as we may have a deeper level. So we need to be one level below the path and not more
        // MISSING: do the lower level
        if ((elementLevel == 1 && pathLevel === 0) || (elementLevel - pathLevel) === 1 && elementDefinition.path.startsWith(path) && elementDefinition.path != diagramNode.path) {
          if (elementDefinition.type != null) {
            let elementDefinitionType = elementDefinition.type[0];
            if (elementDefinitionType.code !== 'BackboneElement') {
              let diagramNodeElement = new DiagramNodeElement();
              diagramNodeElement.name = elementDefinition.sliceName;
              diagramNodeElement.min = elementDefinition.min;
              diagramNodeElement.max = elementDefinition.max;

              diagramNodeElement.type = elementDefinitionType.code;
              if (elementDefinitionType.profile) {
                diagramNodeElement.profile = elementDefinitionType.profile;
              }
              if (elementDefinitionType.targetProfile) {
                diagramNodeElement.profile = elementDefinitionType.targetProfile;
              }

              diagramNode.elements.push(diagramNodeElement);
            }
          }
        }
      }
    }
  }


  ngAfterViewInit() {
    this.graph = new mxGraph(this.graphContainer.nativeElement);
    this.createGraph();
  }

  test() {
    console.log('test');
  }

  private createGraph() {

    this.graph.removeCells(this.graph.getChildVertices(this.graph.getDefaultParent()), true);
    if (this.nodes == null) {
      return;
    }
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      this.graph.setHtmlLabels(true);

      // const e1 = graph.insertEdge(parent, null, 'diagnosis [0..*]', v1, v2, 'strokeColor=black');
      // const e2 = graph.insertEdge(parent, null, 'hospitalization', v1, v3, 'strokeColor=black');
      // const e3 = graph.insertEdge(parent, null, 'location', v1, v4, 'strokeColor=black');
      //
      // graph.updateCellSize(v1, false);
      // graph.updateCellSize(v2, false);
      // graph.updateCellSize(v3, false);
      // graph.updateCellSize(v4, false);
      const vertices: Map<string, any> = new Map<string, any>();

      this.nodes.forEach((value) => {
        if (value.max != null && value.max != "0") {
          let template = '<div style="margin-bottom: 4px;">';
          template += '<div style="' + this.headerStyle + '">' + value.title + '</div>';
          for (let i = 0; i < value.elements.length; i++) {
            const element = value.elements[i];
            if (element.max != null && element.max != "0") {
              template += '<div style="' + this.elementStyle + '">' + element.name + ':' + element.type + '[' + element.min + '...' + element.max + ']';
              if (element.type === 'Reference') {
                template += '<a routerLink="/CapabilityStatement/' + this.stripUrl(element.profile) + '" (click)="this.test()">' + this.stripUrl(element.profile) + '</a>';
              }
              template += '</div>';
            }
          }
          let vertex = this.graph.insertVertex(parent, null, template, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white;margin:0', false);
          this.graph.updateCellSize(vertex, false);
          vertices.set(value.title, vertex);
          // const e1 = graph.insertEdge(parent, null, 'diagnosis [0..*]', v1, v2, 'strokeColor=black');
        }
      });
      this.nodes.forEach(value => {
        let connection = value.connection;
        if (connection != null) {
          const source = vertices.get(connection.source.title);
          const target = vertices.get(connection.target.title);
          let label = connection.label + '[' + connection.sourceCardinality + '...' + connection.targetCardinality + ']';
          this.graph.insertEdge(parent, null, label, source, target, 'strokeColor=black');
        }
      });
    } finally {
      this.graph.getModel().endUpdate();
      this.graph.setEnabled(false);
      new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
    // let encounterTemplate: string;
    // encounterTemplate = '<div style="margin-bottom: 4px;">';
    // encounterTemplate += '<div style="' + this.headerStyle + '">ENCOUNTER</div>';
    // encounterTemplate += '<div style="' + this.elementStyle + '">bookedAppointment: Extension [0..*]</div>';
    // encounterTemplate += '<div style="' + this.elementStyle + '">bookingPathway: Extension [0..1]</div>';
    // encounterTemplate += '<div style="' + this.elementStyle + '">team: Extension [0..1]</div>';
    // encounterTemplate += '<div style="' + this.elementStyle + '">episodeOfCare: Reference [0..1]<a routerLink="/CapabilityStatement/ColumnaEpisodeOfCare" (click)="this.test()">ColumnaEpisodeOfCare</a></div>';
    // encounterTemplate += '</div>';
    //
    // let diagnosisTemplate: string;
    // diagnosisTemplate = '<div style="margin-bottom: 4px;">';
    // diagnosisTemplate += '<div style="' + this.headerStyle + '">DIAGNOSIS</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">diagnosisCode: Extension [1..1]</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">supplementaryAdministrativeCode: Extension [0..*]</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">closeDiagnosisWithAttachedPeriod: Extension [0..1]</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">laterDisproved: Extension [0..1]</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">supplementaryClinicalCodesForReporting: Extension [0..*]</div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '" (click)="test()">condition: Reference [1..1]<a routerLink="/CapabilityStatement/ColumnaDiagnosis" (click)="this.test()">ColumnaDiagnosis</a></div>';
    // diagnosisTemplate += '<div style="' + this.elementStyle + '">role: CodeableConcept [1..1]</div>';
    // diagnosisTemplate += '</div>';
    //
    // let hospitalizationTemplate: string;
    // hospitalizationTemplate = '<div style="margin-bottom: 4px;">';
    // hospitalizationTemplate += '<div style="' + this.headerStyle + '">HOSPITALIZATION</div>';
    // hospitalizationTemplate += '<div style="' + this.elementStyle + '">encounterWard: Extension [0..1]</div>';
    // hospitalizationTemplate += '<div style="' + this.elementStyle + '">expectedDischarge: Extension [0..1]</div>';
    // hospitalizationTemplate += '<div style="' + this.elementStyle + '">municipalityCare: Extension [0..1]</div>';
    // hospitalizationTemplate += '</div>';
    //
    // let locationTemplate: string;
    // locationTemplate = '<div style="margin-bottom: 4px;">';
    // locationTemplate += '<div style="' + this.headerStyle + '">LOCATION</div>';
    // locationTemplate += '<div style="' + this.elementStyle + '">dayRate: Extension [0..1]</div>';
    // locationTemplate += '<div style="' + this.elementStyle + '">outpatientVisitRate: Extension [0..1]</div>';
    // locationTemplate += '<div style="' + this.elementStyle + '">location: Reference [1..1]<a routerLink="/CapabilityStatement/ColumnaLocation">ColumnaLocation</a></div>';
    // locationTemplate += '<div style="' + this.elementStyle + '">period: Period[1..1]</div>';
    // locationTemplate += '</div>';

    let v1;
    // try {
    //   const parent = graph.getDefaultParent();
    //   graph.getModel().beginUpdate();
    //   graph.setHtmlLabels(true);
    //   v1 = graph.insertVertex(parent, null, encounterTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white;margin:0', false);
    //   const v2 = graph.insertVertex(parent, null, diagnosisTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
    //   const v3 = graph.insertVertex(parent, null, hospitalizationTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
    //   const v4 = graph.insertVertex(parent, null, locationTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
    //   const e1 = graph.insertEdge(parent, null, 'diagnosis [0..*]', v1, v2, 'strokeColor=black');
    //   const e2 = graph.insertEdge(parent, null, 'hospitalization', v1, v3, 'strokeColor=black');
    //   const e3 = graph.insertEdge(parent, null, 'location', v1, v4, 'strokeColor=black');
    //
    //   graph.updateCellSize(v1, false);
    //   graph.updateCellSize(v2, false);
    //   graph.updateCellSize(v3, false);
    //   graph.updateCellSize(v4, false);
    //
    // } finally {
    //   graph.getModel().endUpdate();
    //   let allEdges = graph.getAllEdges([v1]);
    //   console.log(allEdges);
    //   graph.setEnabled(false);
    //   new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    // }
  }

}
