import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {DiagramNode} from "../DiagramNode";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ConfigurationService} from "../../../../../../services/infrastructure/configuration.service";
import {StructureDefinitionService} from "../../../../../../services/structure-definition.service";
import {switchMap} from "rxjs/operators";
import {DiagramNodeElement} from "../DiagramNodeElement";
import {DiagramConnection} from "../DiagramConnection";
import {StringUtils} from "../../../../../../core/utils/string-utils";
import StructureDefinition = fhir.StructureDefinition;

declare var mxUtils: any;
declare var mxGraphModel: any;
declare var mxCodecRegistry: any;
declare var mxEvent: any;
declare var mxUndoManager: any;

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
  private elementStyle = "margin-left: 4px; margin-right: 4px;text-align: left; color: black; background-color: white;html=1;autosize=1;resizable=0;";
  private edgeStyle = 'defaultEdge;rounded=1;strokeColor=black;fontColor=black;startArrow=diamond';
  private $resource: Observable<any>;
  private nodes: Map<string, DiagramNode>;

  constructor(private route: ActivatedRoute,
              private router: Router,
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


  calculateChildren(path: string, diagramNode: DiagramNode) {
    if (this.structureDefinition.snapshot) {
      let elementDefinitions = this.structureDefinition.snapshot.element;
      diagramNode.elements = [];
      console.log('now adding elements to ' + path);
      for (let i = 0; i < elementDefinitions.length; i++) {
        const elementDefinition = elementDefinitions[i];
        let elementLevel = StringUtils.computeLevel(elementDefinition.path);
        let pathLevel = StringUtils.computeLevel(path);
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

  private createGraph() {
    const vertices: Map<string, any> = new Map<string, any>();
    this.graph.removeCells(this.graph.getChildVertices(this.graph.getDefaultParent()), true);
    if (this.nodes == null) {
      return;
    }
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      this.graph.setHtmlLabels(true);

      this.nodes.forEach((value) => {
        if (value.max != null && value.max != "0") {
          let template = '<div style="margin-bottom: 4px;">';
          template += '<div style="' + this.headerStyle + '">' + value.title + '</div>';
          for (let i = 0; i < value.elements.length; i++) {
            const element = value.elements[i];
            if (element.max != null && element.max != "0") {
              template += '<div style="' + this.elementStyle + '">' + element.name + ':' + element.type + '[' + element.min + '...' + element.max + ']';
              if (element.type === 'Reference') {
                template += '<a href="/CapabilityStatement/' + StringUtils.stripUrl(element.profile) + '">' + StringUtils.stripUrl(element.profile) + '</a>';
              }
              template += '</div>';
            }
          }
          template += '</div>';
          let vertex = this.graph.insertVertex(parent, null, template, 0, 0, 100, 150, 'strokeColor=black;fillColor=white;margin:0', false);

          this.graph.updateCellSize(vertex, false);
          this.graph.refresh(vertex);
          vertices.set(value.title, vertex);
        }
      });
      this.nodes.forEach(value => {
        let connection = value.connection;
        if (connection != null) {
          const source = vertices.get(connection.source.title);
          const target = vertices.get(connection.target.title);
          let label = connection.label + '[' + connection.sourceCardinality + '...' + connection.targetCardinality + ']';
          this.graph.insertEdge(parent, 'path', label, source, target, this.edgeStyle);
        }
      });
    } finally {
      this.graph.setEnabled(false);
      let layout: mxHierarchicalLayout = new mxHierarchicalLayout(this.graph);

      layout.execute(this.graph.getDefaultParent());
      this.graph.getModel().endUpdate();

    }
  }
}
