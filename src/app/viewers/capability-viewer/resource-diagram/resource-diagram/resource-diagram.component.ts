import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {DiagramNode} from "../model/DiagramNode";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {DiagramNodeElement} from "../model/DiagramNodeElement";
import {DiagramConnection} from "../model/DiagramConnection";
import {ConfigurationService} from "../../../../services/infrastructure/configuration.service";
import {StructureDefinitionService} from "../../../../services/model/structure-definition.service";
import {StringUtils} from "../../../../core/utils/string-utils";
import {ModelUtils} from "../../../../core/utils/model-utils";
import {GlobalPubSubService} from "../../../../services/infrastructure/global-pub-sub.service";
import {ContextService} from "../../../../services/infrastructure/context.service";
import {TypeService} from "../../../../services/type.service";
import {MatDialog} from "@angular/material";
import {CreateBackboneElementComponent} from "./create-backbone-element/create-backbone-element.component";
import {EditResourceElementDialogComponent} from "./create-backbone-element/resource-element-dialog/edit-resource-element-dialog.component";
import StructureDefinition = fhir.StructureDefinition;

// noinspection JSUnusedLocalSymbols
declare var mxConstants: any;
// noinspection JSUnusedLocalSymbols
declare var mxCellOverlay: any;
// noinspection JSUnusedLocalSymbols
declare var mxUtils: any;
// noinspection JSUnusedLocalSymbols
declare var mxWindow: any;
// noinspection JSUnusedLocalSymbols
declare var mxEvent: any;
// noinspection JSUnusedLocalSymbols
declare var mxEffects: any;

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

  private headerStyle = "font-size: 1.2em; font-weight: bold; color: white;background-color: #204e5f; height: 100%; padding-bottom: 8px;padding-top: 8px;margin:0; padding-left: 0; padding-right: 0;margin-left: 0px; margin-right: 0px";
  private elementStyle = "width: 100%;display: flex;margin-left: 4px; margin-right: 4px;text-align: left; color: black; background-color: white;html=1;autosize=1;resizable=0;";
  private edgeStyle = 'defaultEdge;rounded=1;strokeColor=black;fontColor=black;startArrow=diamond';
  private $resource: Observable<any>;
  private nodes: Map<string, DiagramNode>;
  private svgLink = "text-decoration: underline; color: blue; cursor: pointer";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService,
              private contextService: ContextService,
              private globalPubSubService: GlobalPubSubService,
              private typesService: TypeService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.globalPubSubService.subscribe('performNavigation', (value) => {
      this.performNavigation(value);
    });
    this.globalPubSubService.subscribe('sendActionEvent', (value) => {
      this.performAction(value);
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

  static configureStylesheet(graph) {
    let style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
    style[mxConstants.STYLE_STROKEWIDTH] = '1';
  };

  calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));

    this.$resource.subscribe(value => {
      this.calculateGraph(value);
    });
  }

  private calculateGraph(value) {
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
  }

  calculateChildren(path: string, diagramNode: DiagramNode) {
    if (this.structureDefinition.snapshot) {
      let elementDefinitions = this.structureDefinition.snapshot.element;
      diagramNode.elements = [];

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
              diagramNodeElement.readOnly = ModelUtils.isReadOnly(elementDefinition.constraint);
              diagramNodeElement.description = elementDefinition.definition;

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

  performNavigation(args: any) {
    let url = args.url;
    let resource = args.resource;
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
      let layout: mxHierarchicalLayout = new mxHierarchicalLayout(this.mxGraph);

      layout.execute(this.mxGraph.getDefaultParent());
      this.mxGraph.getModel().endUpdate();
    }
  }

  private createConnection(value, vertices: Map<string, any>, parent) {
    let connection = value.connection;
    if (connection != null) {
      const source = vertices.get(connection.source.title);
      const target = vertices.get(connection.target.title);
      let label = connection.label + '[' + connection.sourceCardinality + '...' + connection.targetCardinality + ']';
      this.mxGraph.insertEdge(parent, 'path', label, source, target, this.edgeStyle);
    }
  }

  addChild(value: DiagramNode) {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBackboneElementComponent, {
      width: '500px',
      data: {name: 'abc', animal: 'def'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private createNode(value: DiagramNode, parent, vertices: Map<string, any>) {
    if (value.max != null && value.max != "0") {
      let template = '<div style="margin-bottom: 4px;">';
      template += '<div style="' + this.headerStyle + '">';
      template += value.title;
      // if (this.configurationService.isAdminServer) {
      //   template += '<a>';
      // }
      template += '</div>';
      for (let i = 0; i < value.elements.length; i++) {
        const element = value.elements[i];
        if (!((element.max == null || element.max === '0') && this.hideUnused) && !(element.readOnly && this.hideReadonly)) {
          template += '<div style="' + this.elementStyle + '">';
          if (this.configurationService.isAdminServer && false) {
            template += this.createEditableElement(element);
          } else {
            template += '<div>' + element.name + ': </div>';
            template += '<div>' + element.type + '</div>';
            template += '<div>[' + element.min + '...' + element.max + '] </div>';
          }
          template += '<div>';
          if (element.type === 'Reference') {
            const navigationCommand = "sendNavigationEvent('/CapabilityStatement', '" + StringUtils.stripUrl(element.profile) + "')";
            template += '<span style="' + this.svgLink + '" onmousedown="' + navigationCommand + '">' + StringUtils.stripUrl(element.profile) + '</span>';
          }
          template += '</div>';
          if (this.configurationService.isAdminServer) {

            let stringify = JSON.stringify(element);
            const editCommand = "sendActionEvent('edit', '" + encodeURI(stringify) + "')";
            template += '<div style="text-align: right; width: 100%"  style="\' + this.svgLink + \'" onmousedown="' + editCommand + '"><img src="../../../../../assets/images/edit.png" alt="edit" width="12" height="12"/></div>';
            template += '<div><img src="../../../../../assets/images/delete2.png" alt="delete" width="12" height="12"/></div>';


          }
          template += '</div>';
        }
      }
      template += '</div>';
      if (this.configurationService.isAdminServer) {
        let stringify = JSON.stringify(value);
        const editCommand = "sendActionEvent('addElement', '" + encodeURI(stringify) + "')";
        template += '<div  style="\' + this.svgLink + \'" onmousedown="' + editCommand + '">Add new element</div>';
      }
      let vertex = this.mxGraph.insertVertex(parent, null, template, 0, 0, 100, 150, 'strokeColor=black;fillColor=white;margin:0', false);
      if (this.configurationService.isAdminServer) {
        // this.addOverLay(this.mxGraph, vertex, value);
      }
      this.mxGraph.updateCellSize(vertex, false);
      vertices.set(value.title, vertex);
    }
  }

  private createEditableElement(element: any) {
    let result = "";
    result += '<input type="test" value="' + element.name + '">:';
    result += '<select placeholder="Select Resource">';
    let types = this.typesService.types;
    for (let i = 0; i < types.length; i++) {
      const resourceType = types[i];
      if (resourceType === element.type) {
        result += '<option value="' + resourceType + '" selected>' + resourceType + '</option>'
      } else {
        result += '<option value="' + resourceType + '">' + resourceType + '</option>'
      }
    }
    result += '</select>';
    result += '[' + element.min + '...' + element.max + '] ';
    result += '<button onclick="sendActionEvent(\'save\')">Save</button>'
    return result;
  }

  private performAction(value: any) {
    if (value.action === 'edit') {
      let parse = JSON.parse(decodeURI(value.data));
      const dialogRef = this.dialog.open(EditResourceElementDialogComponent, {
        width: '500px',
        data: parse
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed: ' + result);
      });
    }
    if (value.action === 'addElement') {
      const dialogRef = this.dialog.open(EditResourceElementDialogComponent, {
        width: '500px',
        data: new DiagramNodeElement()
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed: ' + result.name);
          let diagramNode: DiagramNode = JSON.parse(decodeURI(value.data));
          if (!diagramNode.elements) {
            diagramNode.elements = [];
          }
          diagramNode.elements.push(result);
          // this.calculateGraph(value);
        } else {
          console.log('The dialog was closed: ' + result);
        }
      });
    }
  }

  private addOverLay(graph: mxGraph, vertex: any, value: DiagramNode) {
    const overlay = new mxCellOverlay(new mxImage('/assets/images/add.png', 24, 24), 'Add child');
    overlay.cursor = 'hand';
    overlay.align = mxConstants.ALIGN_CENTER;
    graph.addCellOverlay(vertex, overlay);

    overlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function (sender, evt) {
      this.addChild(value);
    }));
  }
}
