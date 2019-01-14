import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DiagramNode} from '../model/DiagramNode';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {DiagramNodeElement} from '../model/DiagramNodeElement';
import {DiagramConnection} from '../model/DiagramConnection';
import {ConfigurationService} from '../../../../services/infrastructure/configuration.service';
import {StructureDefinitionService} from '../../../../services/model/structure-definition.service';
import {StringUtils} from '../../../../core/utils/string-utils';
import {ModelUtils} from '../../../../core/utils/model-utils';
import {GlobalPubSubService} from '../../../../services/infrastructure/global-pub-sub.service';
import {ContextService} from '../../../../services/infrastructure/context.service';
import StructureDefinition = fhir.StructureDefinition;

// noinspection JSUnusedLocalSymbols
declare var mxConstants: any;

@Component({
  selector: 'app-resource-diagram',
  templateUrl: './resource-diagram.component.html',
  styleUrls: ['./resource-diagram.component.css']
})
export class ResourceDiagramComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('graphContainer') graphContainer: ElementRef;
  structureDefinition: StructureDefinition;
  mxGraph: mxGraph;

  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;

  private headerStyle = 'font-size: 1.2em; font-weight: bold; color: white;background-color: #204e5f; height: 100%; ' +
    'padding-bottom: 8px;padding-top: 8px;margin:0; padding-left: 0; padding-right: 0';
  private elementStyle = 'margin-left: 4px; margin-right: 4px;text-align: left; color: black; ' +
    'background-color: white;html=1;autosize=1;resizable=0;';
  private edgeStyle = 'defaultEdge;rounded=1;strokeColor=black;fontColor=black;startArrow=diamond';
  private $resource: Observable<any>;
  private nodes: Map<string, DiagramNode>;
  private svgLink = 'text-decoration: underline; color: blue; cursor: pointer';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService,
              private contextService: ContextService,
              private globalPubSubService: GlobalPubSubService) {
  }

  static configureStylesheet(graph) {
    const style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
    style[mxConstants.STYLE_STROKEWIDTH] = '1';
  }

  calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));

    this.$resource.subscribe(value => {
      this.nodes = new Map<string, DiagramNode>();
      this.structureDefinition = value.resource;
      const parentNode = new DiagramNode();
      parentNode.isParent = true;
      parentNode.title = this.structureDefinition.title;
      parentNode.min = 1;
      parentNode.max = '1';

      if (this.structureDefinition.snapshot) {
        const elementDefinitions = this.structureDefinition.snapshot.element;
        for (let i = 0; i < elementDefinitions.length; i++) {
          const elementDefinition = elementDefinitions[i];
          if (elementDefinition.type != null) {
            const elementType = elementDefinition.type[0];
            if (elementType.code === 'BackboneElement') {
              const diagramNode = new DiagramNode();
              const connection = new DiagramConnection();
              connection.source = parentNode;
              connection.target = diagramNode;
              connection.label = elementDefinition.sliceName;
              connection.sourceCardinality = '' + elementDefinition.min;
              connection.targetCardinality = elementDefinition.max;
              diagramNode.connection = connection;
              diagramNode.title = elementDefinition.sliceName;
              diagramNode.min = elementDefinition.min;
              diagramNode.max = elementDefinition.max;
              diagramNode.short = elementDefinition.short;
              diagramNode.path = elementDefinition.path;
              diagramNode.readOnly = ModelUtils.isReadOnly(elementDefinition.constraint);
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
      this.createGraph();
    });
  }

  calculateChildren(path: string, diagramNode: DiagramNode) {
    if (this.structureDefinition.snapshot) {
      const elementDefinitions = this.structureDefinition.snapshot.element;
      diagramNode.elements = [];

      for (let i = 0; i < elementDefinitions.length; i++) {
        const elementDefinition = elementDefinitions[i];
        const elementLevel = StringUtils.computeLevel(elementDefinition.path);
        const pathLevel = StringUtils.computeLevel(path);
        // cannot use startswith as we may have a deeper level. So we need to be one level below the path and not more
        // MISSING: do the lower level
        if ((elementLevel === 1 && pathLevel === 0) || (elementLevel - pathLevel) === 1 &&
          elementDefinition.path.startsWith(path) && elementDefinition.path !== diagramNode.path) {
          if (elementDefinition.type != null) {
            const elementDefinitionType = elementDefinition.type[0];
            if (elementDefinitionType.code !== 'BackboneElement') {
              const diagramNodeElement = new DiagramNodeElement();
              diagramNodeElement.name = elementDefinition.sliceName;
              diagramNodeElement.min = elementDefinition.min;
              diagramNodeElement.max = elementDefinition.max;
              diagramNodeElement.type = elementDefinitionType.code;
              diagramNodeElement.readOnly = ModelUtils.isReadOnly(elementDefinition.constraint);

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

  ngOnInit() {
    this.globalPubSubService.subscribe('performNavigation', (value) => {
      this.performNavigation(value);
    });
    this.configurationService.serverChanged.subscribe(() => this.calculateElements());
    this.calculateElements();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createGraph();
  }

  ngAfterViewInit() {
    this.mxGraph = new mxGraph(this.graphContainer.nativeElement);
    this.createGraph();
  }

  performNavigation(args: any) {
    const url = args.url;
    const resource = args.resource;
    this.contextService.currentResource = resource;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([url, resource]);
  }

  setContext(resourceName: string) {
    this.contextService.currentResource = resourceName;
  }

  private createGraph() {
    const vertices: Map<string, any> = new Map<string, any>();
    if (!this.mxGraph) {
      return;
    }
    this.mxGraph.removeCells(this.mxGraph.getChildVertices(this.mxGraph.getDefaultParent()), true);
    if (this.nodes == null) {
      return;
    }
    try {
      const parent = this.mxGraph.getDefaultParent();

      ResourceDiagramComponent.configureStylesheet(this.mxGraph);
      this.mxGraph.getModel().beginUpdate();
      this.mxGraph.setHtmlLabels(true);

      this.nodes.forEach((value) => {
        this.createNode(value, parent, vertices);
      });
      this.nodes.forEach(value => {
        this.createConnection(value, vertices, parent);
      });

    } finally {
      this.mxGraph.setEnabled(false);
      const layout: mxHierarchicalLayout = new mxHierarchicalLayout(this.mxGraph);

      layout.execute(this.mxGraph.getDefaultParent());
      this.mxGraph.getModel().endUpdate();

    }

  }

  private createConnection(value, vertices: Map<string, any>, parent) {
    const connection = value.connection;
    if (connection != null) {
      const source = vertices.get(connection.source.title);
      const target = vertices.get(connection.target.title);
      const label = connection.label + '[' + connection.sourceCardinality + '...' + connection.targetCardinality + ']';
      this.mxGraph.insertEdge(parent, 'path', label, source, target, this.edgeStyle);
    }
  }

  private createNode(value, parent, vertices: Map<string, any>) {
    if (value.max != null && value.max !== '0') {
      let template = '<div style="margin-bottom: 4px;">';
      template += '<div style="' + this.headerStyle + '">' + value.title + '</div>';
      for (let i = 0; i < value.elements.length; i++) {
        const element = value.elements[i];
        if (!((element.max == null || element.max === '0') && this.hideUnused) && !(element.readOnly && this.hideReadonly)) {
          template += '<div style="' + this.elementStyle + '">';
          template += element.name + ':';
          template += element.type;
          template += '[' + element.min + '...' + element.max + '] ';
          if (element.type === 'Reference') {
            const navigationCommand = 'sendNavigationEvent(\'/CapabilityStatement\', \'' + StringUtils.stripUrl(element.profile) + '\')';
            template += '<span style="' + this.svgLink + '" onmousedown="' + navigationCommand + '">';
            template += StringUtils.stripUrl(element.profile) + '</span>';
          }
          template += '</div>';
        }
      }
      template += '</div>';
      const vertexStyle = 'strokeColor=black;fillColor=white;margin:0';
      const vertex = this.mxGraph.insertVertex(parent, null, template, 0, 0, 100, 150, vertexStyle, false);
      this.mxGraph.updateCellSize(vertex, false);
      vertices.set(value.title, vertex);
    }
  }
}
