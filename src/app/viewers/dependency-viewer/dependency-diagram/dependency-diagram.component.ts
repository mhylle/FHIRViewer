import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from '../../../services/model/resource.service';
import {StructureDefinitionService} from '../../../services/model/structure-definition.service';
import StructureDefinition = fhir.StructureDefinition;

// noinspection JSUnusedLocalSymbols
declare var mxConstants: any;

@Component({
  selector: 'app-dependency-diagram',
  templateUrl: './dependency-diagram.component.html',
  styleUrls: ['./dependency-diagram.component.css']
})
export class DependencyDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('graphContainer') graphContainer: ElementRef;
  mxGraph: mxGraph;
  private resourceTypes: string[] = [];
  private vertices: Map<string, any> = new Map<string, any>();

  constructor(private resourceService: ResourceService, private structureDefinitionService: StructureDefinitionService) {
  }

  static configureStylesheet(graph) {
    const style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
    style[mxConstants.STYLE_STROKEWIDTH] = '1';
  }

  ngOnInit() {
    this.resourceService.bundle.subscribe(value => {
      for (let i = 0; i < value.entry.length; i++) {
        const entryElement = value.entry[i];
        if (entryElement.resource.id.startsWith('Columna')) {
          this.resourceTypes.push(entryElement.resource.id);
        }
      }
      this.resourceTypes.sort((a, b) => a.localeCompare(b));
    });
  }

  ngAfterViewInit() {
    this.mxGraph = new mxGraph(this.graphContainer.nativeElement);

    try {
      const parent = this.mxGraph.getDefaultParent();

      DependencyDiagramComponent.configureStylesheet(this.mxGraph);
      this.mxGraph.getModel().beginUpdate();
      this.mxGraph.setHtmlLabels(true);

      this.resourceTypes.forEach(value => {
        const vertex = this.mxGraph.insertVertex(parent, null, value, 0, 0, 100, 150);
        this.mxGraph.updateCellSize(vertex, false);
        this.vertices.set(value, vertex);
      });
      this.createDependencies();
    } finally {
      this.mxGraph.setEnabled(false);
      // const layout: mxHierarchicalLayout = new mxHierarchicalLayout(this.mxGraph);
      // layout.orientation = mxConstants.DIRECTION_WEST;
      // layout.execute(this.mxGraph.getDefaultParent());
      this.mxGraph.getModel().endUpdate();
    }
  }

  createDependencies() {
    const connections = [{a: null, b: null}];
    this.vertices.forEach((value, key) => {
      this.structureDefinitionService.getStructure(key).subscribe((structureDefinition: StructureDefinition) => {
        structureDefinition.snapshot.element.forEach(elm => {
          if (elm.sliceName !== key) {
            if (!connections.find(connection => {
              return (connection.a === key && connection.b === elm.sliceName) || (connection.b === key && connection.a === elm.sliceName);
            })) {
              connections.push({a: key, b: elm.sliceName});
            }
          }
        });
      });
    });
  }


}
