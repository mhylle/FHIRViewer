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
import {TypeService} from '../../../../services/type.service';
import {MatDialog} from '@angular/material';
import {CreateBackboneElementComponent} from './create-backbone-element/create-backbone-element.component';
import {EditResourceElementDialogComponent} from './create-backbone-element/resource-element-dialog/edit-resource-element-dialog.component';
import {TypeElement} from '../../../../core/model/fhir/type-element';
import StructureDefinition = fhir.StructureDefinition;
import ElementDefinition = fhir.ElementDefinition;

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

  private headerStyle = 'font-size: 1.2em; font-weight: bold; color: white;background-color: #204e5f; ' +
    'height: 100%; padding-bottom: 8px;padding-top: 8px;margin:0; padding-left: 0; ' +
    'padding-right: 0;margin-left: 0px; margin-right: 0px';

  @ViewChild('graphContainer') graphContainer: ElementRef;
  structureDefinition: StructureDefinition;
  mxGraph: mxGraph;

  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;
  private elementStyle = 'width: 100%;display: flex;margin-left: 4px; margin-right: 4px;' +
    'text-align: left; color: black; background-color: white;html=1;autosize=1;resizable=0;';
  private svgLink = 'text-decoration: underline; color: blue; cursor: pointer';
  private edgeStyle = 'defaultEdge;rounded=1;strokeColor=black;fontColor=black;startArrow=diamond';
  private $resource: Observable<any>;
  private nodes: Map<string, DiagramNode>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService,
              private contextService: ContextService,
              private globalPubSubService: GlobalPubSubService,
              private typesService: TypeService,
              public dialog: MatDialog) {
  }

  static configureStylesheet(graph) {
    const style = graph.stylesheet.getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#ffffff';
    style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
    style[mxConstants.STYLE_STROKEWIDTH] = '1';
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

  calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));

    this.$resource.subscribe(value => {
      this.calculateGraph(value);
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
        if ((elementLevel === 1 && pathLevel === 0)
          || (elementLevel - pathLevel) === 1
          && elementDefinition.path.startsWith(path)
          && elementDefinition.path !== diagramNode.path) {
          if (elementDefinition.type != null) {
            const elementDefinitionType = elementDefinition.type[0];
            if (elementDefinitionType.code !== 'BackboneElement') {
              const diagramNodeElement = new DiagramNodeElement();
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
    const url = args.url;
    const resource = args.resource;
    this.contextService.currentResource = resource;
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([url, resource]);
  }

  addChild() {
    this.openDialog();
  }

  setContext(resourceName: string) {
    this.contextService.currentResource = resourceName;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateBackboneElementComponent, {
      width: '500px',
      data: {name: 'abc', animal: 'def'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ' + result);
    });
  }

  save() {
    const snapshot = this.structureDefinition.snapshot;
    snapshot.element = [];

    const parentNode = this.nodes.get(this.structureDefinition.title);
    for (let i = 0; i < parentNode.elements.length; i++) {
      const element = parentNode.elements[i];
      let elementDefinition: ElementDefinition;
      elementDefinition = new class implements ElementDefinition {
        _alias: fhir.Element[];
        _comment: fhir.Element;
        _condition: fhir.Element[];
        _contentReference: fhir.Element;
        _defaultValueBase64Binary: fhir.Element;
        _defaultValueBoolean: fhir.Element;
        _defaultValueCode: fhir.Element;
        _defaultValueDate: fhir.Element;
        _defaultValueDateTime: fhir.Element;
        _defaultValueDecimal: fhir.Element;
        _defaultValueId: fhir.Element;
        _defaultValueInstant: fhir.Element;
        _defaultValueInteger: fhir.Element;
        _defaultValueMarkdown: fhir.Element;
        _defaultValueOid: fhir.Element;
        _defaultValuePositiveInt: fhir.Element;
        _defaultValueString: fhir.Element;
        _defaultValueTime: fhir.Element;
        _defaultValueUnsignedInt: fhir.Element;
        _defaultValueUri: fhir.Element;
        _definition: fhir.Element;
        _fhir_comments: fhir.Element[];
        _fixedBase64Binary: fhir.Element;
        _fixedBoolean: fhir.Element;
        _fixedCode: fhir.Element;
        _fixedDate: fhir.Element;
        _fixedDateTime: fhir.Element;
        _fixedDecimal: fhir.Element;
        _fixedId: fhir.Element;
        _fixedInstant: fhir.Element;
        _fixedInteger: fhir.Element;
        _fixedMarkdown: fhir.Element;
        _fixedOid: fhir.Element;
        _fixedPositiveInt: fhir.Element;
        _fixedString: fhir.Element;
        _fixedTime: fhir.Element;
        _fixedUnsignedInt: fhir.Element;
        _fixedUri: fhir.Element;
        _id: fhir.Element;
        _isModifier: fhir.Element;
        _isSummary: fhir.Element;
        _label: fhir.Element;
        _max: fhir.Element;
        _maxLength: fhir.Element;
        _maxValueDate: fhir.Element;
        _maxValueDateTime: fhir.Element;
        _maxValueDecimal: fhir.Element;
        _maxValueInstant: fhir.Element;
        _maxValueInteger: fhir.Element;
        _maxValuePositiveInt: fhir.Element;
        _maxValueTime: fhir.Element;
        _maxValueUnsignedInt: fhir.Element;
        _meaningWhenMissing: fhir.Element;
        _min: fhir.Element;
        _minValueDate: fhir.Element;
        _minValueDateTime: fhir.Element;
        _minValueDecimal: fhir.Element;
        _minValueInstant: fhir.Element;
        _minValueInteger: fhir.Element;
        _minValuePositiveInt: fhir.Element;
        _minValueTime: fhir.Element;
        _minValueUnsignedInt: fhir.Element;
        _mustSupport: fhir.Element;
        _orderMeaning: fhir.Element;
        _path: fhir.Element;
        _patternBase64Binary: fhir.Element;
        _patternBoolean: fhir.Element;
        _patternCode: fhir.Element;
        _patternDate: fhir.Element;
        _patternDateTime: fhir.Element;
        _patternDecimal: fhir.Element;
        _patternId: fhir.Element;
        _patternInstant: fhir.Element;
        _patternInteger: fhir.Element;
        _patternMarkdown: fhir.Element;
        _patternOid: fhir.Element;
        _patternPositiveInt: fhir.Element;
        _patternString: fhir.Element;
        _patternTime: fhir.Element;
        _patternUnsignedInt: fhir.Element;
        _patternUri: fhir.Element;
        _representation: fhir.Element[];
        _requirements: fhir.Element;
        _short: fhir.Element;
        _sliceName: fhir.Element;
        alias: string[];
        base: fhir.ElementDefinitionBase;
        binding: fhir.ElementDefinitionBinding;
        code: fhir.Coding[];
        comment: fhir.markdown;
        condition: fhir.id[];
        constraint: fhir.ElementDefinitionConstraint[];
        contentReference: fhir.uri;
        defaultValueAddress: fhir.Address;
        defaultValueAge: fhir.Age;
        defaultValueAnnotation: fhir.Annotation;
        defaultValueAttachment: fhir.Attachment;
        defaultValueBase64Binary: fhir.base64Binary;
        defaultValueBoolean: boolean;
        defaultValueCode: fhir.code;
        defaultValueCodeableConcept: fhir.CodeableConcept;
        defaultValueCoding: fhir.Coding;
        defaultValueContactPoint: fhir.ContactPoint;
        defaultValueCount: fhir.Count;
        defaultValueDate: fhir.date;
        defaultValueDateTime: fhir.dateTime;
        defaultValueDecimal: fhir.decimal;
        defaultValueDistance: fhir.Distance;
        defaultValueDuration: fhir.Duration;
        defaultValueHumanName: fhir.HumanName;
        defaultValueId: fhir.id;
        defaultValueIdentifier: fhir.Identifier;
        defaultValueInstant: fhir.instant;
        defaultValueInteger: fhir.integer;
        defaultValueMarkdown: fhir.markdown;
        defaultValueMeta: fhir.Meta;
        defaultValueMoney: fhir.Money;
        defaultValueOid: fhir.oid;
        defaultValuePeriod: fhir.Period;
        defaultValuePositiveInt: fhir.positiveInt;
        defaultValueQuantity: fhir.Quantity;
        defaultValueRange: fhir.Range;
        defaultValueRatio: fhir.Ratio;
        defaultValueReference: fhir.Reference;
        defaultValueSampledData: fhir.SampledData;
        defaultValueSignature: fhir.Signature;
        defaultValueString: string;
        defaultValueTime: fhir.time;
        defaultValueTiming: fhir.Timing;
        defaultValueUnsignedInt: fhir.unsignedInt;
        defaultValueUri: fhir.uri;
        definition: fhir.markdown;
        example: fhir.ElementDefinitionExample[];
        extension: fhir.Extension[];
        fhir_comments: string[];
        fixedAddress: fhir.Address;
        fixedAge: fhir.Age;
        fixedAnnotation: fhir.Annotation;
        fixedAttachment: fhir.Attachment;
        fixedBase64Binary: fhir.base64Binary;
        fixedBoolean: boolean;
        fixedCode: fhir.code;
        fixedCodeableConcept: fhir.CodeableConcept;
        fixedCoding: fhir.Coding;
        fixedContactPoint: fhir.ContactPoint;
        fixedCount: fhir.Count;
        fixedDate: fhir.date;
        fixedDateTime: fhir.dateTime;
        fixedDecimal: fhir.decimal;
        fixedDistance: fhir.Distance;
        fixedDuration: fhir.Duration;
        fixedHumanName: fhir.HumanName;
        fixedId: fhir.id;
        fixedIdentifier: fhir.Identifier;
        fixedInstant: fhir.instant;
        fixedInteger: fhir.integer;
        fixedMarkdown: fhir.markdown;
        fixedMeta: fhir.Meta;
        fixedMoney: fhir.Money;
        fixedOid: fhir.oid;
        fixedPeriod: fhir.Period;
        fixedPositiveInt: fhir.positiveInt;
        fixedQuantity: fhir.Quantity;
        fixedRange: fhir.Range;
        fixedRatio: fhir.Ratio;
        fixedReference: fhir.Reference;
        fixedSampledData: fhir.SampledData;
        fixedSignature: fhir.Signature;
        fixedString: string;
        fixedTime: fhir.time;
        fixedTiming: fhir.Timing;
        fixedUnsignedInt: fhir.unsignedInt;
        fixedUri: fhir.uri;
        id: string;
        isModifier: boolean;
        isSummary: boolean;
        label: string;
        mapping: fhir.ElementDefinitionMapping[];
        max: string;
        maxLength: fhir.integer;
        maxValueDate: fhir.date;
        maxValueDateTime: fhir.dateTime;
        maxValueDecimal: fhir.decimal;
        maxValueInstant: fhir.instant;
        maxValueInteger: fhir.integer;
        maxValuePositiveInt: fhir.positiveInt;
        maxValueQuantity: fhir.Quantity;
        maxValueTime: fhir.time;
        maxValueUnsignedInt: fhir.unsignedInt;
        meaningWhenMissing: fhir.markdown;
        min: fhir.unsignedInt;
        minValueDate: fhir.date;
        minValueDateTime: fhir.dateTime;
        minValueDecimal: fhir.decimal;
        minValueInstant: fhir.instant;
        minValueInteger: fhir.integer;
        minValuePositiveInt: fhir.positiveInt;
        minValueQuantity: fhir.Quantity;
        minValueTime: fhir.time;
        minValueUnsignedInt: fhir.unsignedInt;
        mustSupport: boolean;
        orderMeaning: string;
        path: string;
        patternAddress: fhir.Address;
        patternAge: fhir.Age;
        patternAnnotation: fhir.Annotation;
        patternAttachment: fhir.Attachment;
        patternBase64Binary: fhir.base64Binary;
        patternBoolean: boolean;
        patternCode: fhir.code;
        patternCodeableConcept: fhir.CodeableConcept;
        patternCoding: fhir.Coding;
        patternContactPoint: fhir.ContactPoint;
        patternCount: fhir.Count;
        patternDate: fhir.date;
        patternDateTime: fhir.dateTime;
        patternDecimal: fhir.decimal;
        patternDistance: fhir.Distance;
        patternDuration: fhir.Duration;
        patternHumanName: fhir.HumanName;
        patternId: fhir.id;
        patternIdentifier: fhir.Identifier;
        patternInstant: fhir.instant;
        patternInteger: fhir.integer;
        patternMarkdown: fhir.markdown;
        patternMeta: fhir.Meta;
        patternMoney: fhir.Money;
        patternOid: fhir.oid;
        patternPeriod: fhir.Period;
        patternPositiveInt: fhir.positiveInt;
        patternQuantity: fhir.Quantity;
        patternRange: fhir.Range;
        patternRatio: fhir.Ratio;
        patternReference: fhir.Reference;
        patternSampledData: fhir.SampledData;
        patternSignature: fhir.Signature;
        patternString: string;
        patternTime: fhir.time;
        patternTiming: fhir.Timing;
        patternUnsignedInt: fhir.unsignedInt;
        patternUri: fhir.uri;
        representation: fhir.code[];
        requirements: fhir.markdown;
        short: string;
        sliceName: string;
        slicing: fhir.ElementDefinitionSlicing;
        type: fhir.ElementDefinitionType[];
      };
      elementDefinition.min = element.min;
      elementDefinition.max = element.max;
      // if (element.readOnly) {
      //   let constraint = elementDefinition.constraint;
      //   constraint.keys() = 'Readonly';
      // }

      elementDefinition.definition = element.description;
      const typeElement = new TypeElement();
      typeElement.code = element.type;
      typeElement.profile = element.profile;
      if (!elementDefinition.type) {
        elementDefinition.type = [];
      }
      elementDefinition.type.push(typeElement);
      elementDefinition.sliceName = element.name;

      snapshot.element.push(elementDefinition);
    }
    this.structureDefinition.snapshot = snapshot;
    this.structureService.save(this.structureDefinition).subscribe(value => console.log(value));
  }

  private calculateGraph(value) {
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

  private createNode(value: DiagramNode, parent, vertices: Map<string, any>) {
    if (value.max != null && value.max !== '0') {
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
            const navigationCommand = 'sendNavigationEvent(\'/CapabilityStatement\', \'' + StringUtils.stripUrl(element.profile) + '\')';
            template += '<span style="' + this.svgLink + '" onmousedown="' + navigationCommand + '">'
              + StringUtils.stripUrl(element.profile) + '</span>';
          }
          template += '</div>';
          if (this.configurationService.isAdminServer) {
            const stringify = JSON.stringify(element);
            const editCommand = 'sendActionEvent(\'edit\', \'' + encodeURI(stringify) + '\')';
            template += '<div style="text-align: right; width: 100%"  ' +
              'style="\' + this.svgLink + \'" onmousedown="' + editCommand + '">' +
              '<img src="../../../../../assets/images/edit.png" alt="edit" width="12" height="12"/></div>';
            template += '<div><img src="../../../../../assets/images/delete2.png" alt="delete" width="12" height="12"/></div>';


          }
          template += '</div>';
        }
      }
      template += '</div>';
      if (this.configurationService.isAdminServer) {
        console.log(value.title);
        const editCommand = 'sendActionEvent(\'addElement\', \'' + value.title + '\')';
        template += '<div  style="\' + this.svgLink + \'" onmousedown="' + editCommand + '">Add new element</div>';
        console.log('test');
      }
      const vertex = this.mxGraph.insertVertex(parent, null, template, 0, 0, 100, 150, 'strokeColor=black;fillColor=white;margin:0', false);
      if (this.configurationService.isAdminServer) {
        // this.addOverLay(this.mxGraph, vertex, value);
      }
      this.mxGraph.updateCellSize(vertex, false);
      vertices.set(value.title, vertex);
    }
  }

  private createEditableElement(element: any) {
    let result = '';
    result += '<input type="test" value="' + element.name + '">:';
    result += '<select placeholder="Select Resource">';
    const types = this.typesService.types;
    for (let i = 0; i < types.length; i++) {
      const resourceType = types[i];
      if (resourceType === element.type) {
        result += '<option value="' + resourceType + '" selected>' + resourceType + '</option>';
      } else {
        result += '<option value="' + resourceType + '">' + resourceType + '</option>';
      }
    }
    result += '</select>';
    result += '[' + element.min + '...' + element.max + '] ';
    result += '<button onclick="sendActionEvent(\'save\')">Save</button>';
    return result;
  }

  private performAction(value: any) {
    if (value.action === 'edit') {
      const parse = JSON.parse(decodeURI(value.data));
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

          const parentNode = this.nodes.get(value.data);
          if (!parentNode.elements) {
            parentNode.elements = [];
          }
          parentNode.elements.push(result);
          this.createGraph();
        } else {
          console.log('The dialog was closed: ' + result);
        }
        this.save();
      });
    }
  }

  // private addOverLay(graph: mxGraph, vertex: any, value: DiagramNode) {
  //   const overlay = new mxCellOverlay(new mxImage('/assets/images/add.png', 24, 24), 'Add child');
  //   overlay.cursor = 'hand';
  //   overlay.align = mxConstants.ALIGN_CENTER;
  //   graph.addCellOverlay(vertex, overlay);
  //
  //   overlay.addListener(mxEvent.CLICK, mxUtils.bind(this, function (sender, evt) {
  //     this.addChild(value);
  //   }));
  // }
}
