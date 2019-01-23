import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {select, Store} from '@ngrx/store';

import {AppState} from '../../../store/reducers';
import {Observable} from 'rxjs';

import {AllResourcesRequested} from '../../../store/structureDefinitions/structureDefinitions.actions';
import {selectColumnaResources} from '../../../store/structureDefinitions/structuredefinitions.selectors';
import {StringUtils} from "../../../core/utils/string-utils";
import BundleEntry = fhir.BundleEntry;

// noinspection JSUnusedLocalSymbols
declare var mxConstants: any;
// declare var mxSwimlaneLayout: any;

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
  private bundle$: Observable<BundleEntry[]>;
  private edgeStyle = 'defaultEdge;rounded=1;strokeColor=black;fontColor=black;startArrow=diamond';

  constructor(private store: Store<AppState>) {
  }

  // static configureStylesheet(graph) {
  //   const style = graph.stylesheet.getDefaultEdgeStyle();
  //   style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
  //   style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
  //   style[mxConstants.STYLE_STROKEWIDTH] = '1';
  // }

  ngOnInit() {
    // this.store.dispatch(new AllResourcesRequested());
    // this.bundle$ = this.store.pipe(select(selectColumnaResources));
  }

  ngAfterViewInit() {
    console.log('start');
    const nodes = [];
    const connections: Map<string, string> = new Map<string, string>();
    this.store.dispatch(new AllResourcesRequested());
    this.store.pipe(select(selectColumnaResources)).subscribe(resources => {
      // console.log(resources.id);
      resources.forEach(resource => {
        console.log(resource.id);
        if (resource.resource.snapshot) {
          console.log('HAD SNAPSHOT')
          nodes.push(resource.id);
          resource.resource.snapshot.element.forEach(elm => {
            console.log('Pushing node: ' + resource.id);
            if (elm.type && elm.type.length > 0) {
              if (elm.type[0].code === 'Reference') {
                const ref = StringUtils.stripUrl(elm.type[0].profile);
                if (!connections.get(resource.id)) {
                  connections.set(resource.id, ref);
                } else {
                  if (!connections.get(resource.id) === ref) {
                    connections.set(resource.id, ref);
                  }
                }
              }
            }
          });
        }
      });
      console.log('nodes: ' + nodes.length);
      this.mxGraph = new mxGraph(this.graphContainer.nativeElement);

      try {
        const parent = this.mxGraph.getDefaultParent();

        // configureStylesheet(this.mxGraph);
        this.mxGraph.getModel().beginUpdate();
        // this.mxGraph.setHtmlLabels(true);

        nodes.forEach(value => {
          const vertex = this.mxGraph.insertVertex(parent, null, value, 0, 0, 100, 150);
          this.mxGraph.updateCellSize(vertex, false);
          this.vertices.set(value, vertex);
        });
        connections.forEach((value, key) => {
          const source = this.vertices.get(key);
          const target = this.vertices.get(value);
          this.mxGraph.insertEdge(parent, null, null, source, target, this.edgeStyle);
        });
      } finally {
        this.mxGraph.setEnabled(false);
        // this.mxGraph.zoom(0.1, '');
        const layout = new mxHierarchicalLayout(this.mxGraph);
        // const layout: mxHierarchicalLayout = new mxHierarchicalLayout(this.mxGraph);
        // layout.orientation = mxConstants.DIRECTION_WEST;
        layout.execute(this.mxGraph.getDefaultParent());
        this.mxGraph.getModel().endUpdate();
      }
    });
  }
}
