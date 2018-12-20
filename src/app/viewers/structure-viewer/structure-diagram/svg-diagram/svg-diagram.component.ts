import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CoreElement} from '../../../../core/model/coreElement';
import {BackboneElement} from '../../../../core/model/backbone-element';
import {isDefined} from '@angular/compiler/src/util';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../../../services/infrastructure/configuration.service';
import {StructureDefinitionService} from '../../../../services/structure-definition.service';

@Component({
  selector: 'app-svg-diagram',
  templateUrl: './svg-diagram.component.html',
  styleUrls: ['./svg-diagram.component.css']
})
export class SvgDiagramComponent implements OnInit, AfterViewInit {
  @Input()
  resource: string;

  @Input()
  hideUnused: boolean;

  @Input()
  hideReadonly: boolean;
  resourceDescription: string;
  backBoneElements: BackboneElement[];
  structure: any;

  @ViewChild('canvas')
  public canvas: ElementRef;
  @Input()
  public width = 700;
  @Input()
  public height = 600;
  private ctx: CanvasRenderingContext2D;
  private $resource: Observable<any>;

  constructor(private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService) {
  }

  ngOnInit() {
    this.configurationService.serverChanged.subscribe(() => this.calculateElements());
    this.calculateElements();
  }

  calcTextElement(element: BackboneElement, index: number): string {
    return '<text x="5" y="' + 18 * index + '" fill="black">' + element.name + '</text>';
  }

  ngAfterViewInit(): void {
    // this.createUml();
  }

  private calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      this.backBoneElements = [];
      let res: any;
      if (value.resource.snapshot) {
        res = value.resource.snapshot;
      } else if (value.resource.differential) {
        res = value.resource.differential;
      }
      const coreElements: CoreElement[] = [];
      if (res.element) {
        for (let i = 0; i < res.element.length; i++) {
          const elm = res.element[i];
          const coreElement = new CoreElement();
          coreElement.path = elm.path;
          if (elm.sliceName !== '') {
            coreElement.name = elm.sliceName;
          } else if (elm.id) {
            coreElement.name = elm.id;
          }

          coreElement.min = elm.min;
          coreElement.max = elm.max;
          if (elm.type) {
            coreElement.type = elm.type[0].code;
            if (elm.type[0].profile && elm.type[0].profile instanceof Array) {
              coreElement.profile = elm.type[0].profile[0];
            } else if (elm.type[0].profile) {
              coreElement.profile = elm.type[0].profile;
            }
          }
          if (elm.constraint) {
            if (elm.constraint[0].key === 'Readonly') {
              coreElement.readonly = true;
            }
          }
          if (elm.short) {
            coreElement.description = elm.short;
          }
          if (elm.definition && !elm.type) {
            coreElement.definition = elm.definition;
          }
          coreElements.push(coreElement);
        }
      }

      const parentElement = new BackboneElement();
      parentElement.items = [];
      this.resourceDescription = '';
      this.backBoneElements.push(parentElement);
      for (let i = 0; i < coreElements.length; i++) {
        const coreElement = coreElements[i];
        if (!isDefined(coreElement.path) || coreElement.path === null) {
          if (!isDefined(coreElement.name) || coreElement.name === null) {
            parentElement.description = coreElement.definition;
            this.resourceDescription = coreElement.definition;
          }
        } else if (!isDefined(coreElement.name) || coreElement.name === null) {
          parentElement.name = coreElement.path;
          parentElement.path = coreElement.path;
        } else if (coreElement.type === 'BackboneElement') {
          const backBoneElement = new BackboneElement();
          backBoneElement.parent = parentElement;
          backBoneElement.items = [];
          backBoneElement.name = coreElement.name.trim();
          backBoneElement.min = coreElement.min;
          backBoneElement.max = coreElement.max;
          for (let j = 0; j < coreElements.length; j++) {
            const coreElement1 = coreElements[j];
            if (coreElement1.path && coreElement1.path.startsWith(coreElement.path)) {
              backBoneElement.items.push(coreElement1);
            }
          }
          this.backBoneElements.push(backBoneElement);
        } else {
          if (coreElement.type && coreElement.type.split('.').length === 1) {
            parentElement.items.push(coreElement);
          }
        }
      }
      this.createUml();
    });
  }

  private createUml() {
    console.log('after view initr');
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    // for (let i = 0; i < this.backBoneElements.length; i++) {
    const backBoneElement = this.backBoneElements[0];
    let x: number;
    let y: number;
    let h: number;
    const w = 300;
    // if (i === 0) {
    x = (this.width / 2) - w / 2;
    h = 19 * backBoneElement.items.length;
    // } else {
    //   x = 5;
    // }
    y = 5;
    console.log(y);
    this.ctx.strokeStyle = '#000000';
    this.ctx.rect(x, y, w, h);
    this.ctx.fillStyle = '#204e5f';
    this.ctx.fillRect(x, y, w, 20);
    this.ctx.moveTo(x, y + 20);
    this.ctx.lineTo(x + w, y + 20);
    this.ctx.font = '1em Arial';
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(backBoneElement.name, x + 5, y + 18);
    this.ctx.fillStyle = '#000000';
    let counter = 0;
    for (let j = 0; j < backBoneElement.items.length; j++) {
      const item = backBoneElement.items[j];
      if (isDefined(item) && item !== null && item.name !== null && item.name !== '') {
        if (item.max === '0') {
          continue;
        }
        this.ctx.font = '.8em Arial';
        const text = item.name + ':' + item.type + ' [' + item.min + '...' + item.max + ']';
        this.ctx.fillText(text, x + 5, (y + 35) + counter++ * 18);
      }
    }
    this.ctx.stroke();
    // }
  }
}
