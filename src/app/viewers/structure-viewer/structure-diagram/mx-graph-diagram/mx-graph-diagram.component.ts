import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConfigurationService} from "../../../../services/infrastructure/configuration.service";
import {StructureDefinitionService} from "../../../../services/structure-definition.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import StructureDefinition = fhir.StructureDefinition;

@Component({
  selector: 'app-mx-graph-diagram',
  templateUrl: './mx-graph-diagram.component.html',
  styleUrls: ['./mx-graph-diagram.component.css']
})
export class MxGraphDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') graphContainer: ElementRef;

  private headerStyle = "font-size: 1.2em; font-weight: bold; color: white;background-color: #204e5f; height: 100%; padding-bottom: 8px;padding-top: 8px;margin:0";
  private elementStyle = "margin-left: 4px; margin-right: 4px;text-align: left; color: black";
  private $resource: Observable<StructureDefinition>;


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
      if (value.snapshot) {
        let elementDefinitions = value.snapshot.element;
        for (let i = 0; i < elementDefinitions.length; i++) {
          const elementDefinition = elementDefinitions[i];

        }
      }
    });
  }

  ngAfterViewInit() {
    const graph = new mxGraph(this.graphContainer.nativeElement);

    let encounterTemplate: string;
    encounterTemplate = '<div style="margin-bottom: 4px;">';
    encounterTemplate += '<div style="' + this.headerStyle + '">ENCOUNTER</div>';
    encounterTemplate += '<div style="' + this.elementStyle + '">bookedAppointment: Extension [0..*]</div>';
    encounterTemplate += '<div style="' + this.elementStyle + '">bookingPathway: Extension [0..1]</div>';
    encounterTemplate += '<div style="' + this.elementStyle + '">team: Extension [0..1]</div>';
    encounterTemplate += '<div style="' + this.elementStyle + '">episodeOfCare: Reference [0..1]<a routerLink="/CapabilityStatement/ColumnaEpisodeOfCare" (click)="this.test()">ColumnaEpisodeOfCare</a></div>';
    encounterTemplate += '</div>';

    let diagnosisTemplate: string;
    diagnosisTemplate = '<div style="margin-bottom: 4px;">';
    diagnosisTemplate += '<div style="' + this.headerStyle + '">DIAGNOSIS</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">diagnosisCode: Extension [1..1]</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">supplementaryAdministrativeCode: Extension [0..*]</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">closeDiagnosisWithAttachedPeriod: Extension [0..1]</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">laterDisproved: Extension [0..1]</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">supplementaryClinicalCodesForReporting: Extension [0..*]</div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '" (click)="test()">condition: Reference [1..1]<a routerLink="/CapabilityStatement/ColumnaDiagnosis" (click)="this.test()">ColumnaDiagnosis</a></div>';
    diagnosisTemplate += '<div style="' + this.elementStyle + '">role: CodeableConcept [1..1]</div>';
    diagnosisTemplate += '</div>';

    let hospitalizationTemplate: string;
    hospitalizationTemplate = '<div style="margin-bottom: 4px;">';
    hospitalizationTemplate += '<div style="' + this.headerStyle + '">HOSPITALIZATION</div>';
    hospitalizationTemplate += '<div style="' + this.elementStyle + '">encounterWard: Extension [0..1]</div>';
    hospitalizationTemplate += '<div style="' + this.elementStyle + '">expectedDischarge: Extension [0..1]</div>';
    hospitalizationTemplate += '<div style="' + this.elementStyle + '">municipalityCare: Extension [0..1]</div>';
    hospitalizationTemplate += '</div>';

    let locationTemplate: string;
    locationTemplate = '<div style="margin-bottom: 4px;">';
    locationTemplate += '<div style="' + this.headerStyle + '">LOCATION</div>';
    locationTemplate += '<div style="' + this.elementStyle + '">dayRate: Extension [0..1]</div>';
    locationTemplate += '<div style="' + this.elementStyle + '">outpatientVisitRate: Extension [0..1]</div>';
    locationTemplate += '<div style="' + this.elementStyle + '">location: Reference [1..1]<a routerLink="/CapabilityStatement/ColumnaLocation">ColumnaLocation</a></div>';
    locationTemplate += '<div style="' + this.elementStyle + '">period: Period[1..1]</div>';
    locationTemplate += '</div>';

    let v1;
    try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();
      graph.setHtmlLabels(true);
      v1 = graph.insertVertex(parent, null, encounterTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white;margin:0', false);
      const v2 = graph.insertVertex(parent, null, diagnosisTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
      const v3 = graph.insertVertex(parent, null, hospitalizationTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
      const v4 = graph.insertVertex(parent, null, locationTemplate, 0, 0, 100, 150, 'ROUNDED;strokeColor=black;fillColor=white', false);
      const e1 = graph.insertEdge(parent, null, 'diagnosis [0..*]', v1, v2, 'strokeColor=black');
      const e2 = graph.insertEdge(parent, null, 'hospitalization', v1, v3, 'strokeColor=black');
      const e3 = graph.insertEdge(parent, null, 'location', v1, v4, 'strokeColor=black');

      graph.updateCellSize(v1, false);
      graph.updateCellSize(v2, false);
      graph.updateCellSize(v3, false);
      graph.updateCellSize(v4, false);

    } finally {
      graph.getModel().endUpdate();
      let allEdges = graph.getAllEdges([v1]);
      console.log(allEdges);
      graph.setEnabled(false);
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
  }

  test() {
    console.log('test');
  }
}
