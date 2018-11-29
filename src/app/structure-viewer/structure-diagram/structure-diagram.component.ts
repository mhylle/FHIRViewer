import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Structure} from '../../model/structure';
import {BackboneElement} from '../../model/backbone-element';
import {CoreElement} from '../../model/coreElement';
import {isDefined} from '@angular/compiler/src/util';
import {StructureService} from '../../structure.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-structure-diagram',
  templateUrl: './structure-diagram.component.html',
  styleUrls: ['./structure-diagram.component.css']
})
export class StructureDiagramComponent implements OnInit, OnChanges {
  @Input()
  resource: string;

  @Input()
  hideUnused: boolean;

  @Input()
  hideReadonly: boolean;

  @Output()
  resourceSelected: EventEmitter<string> = new EventEmitter<string>();
  resourceDescription: string;
  backBoneElements: BackboneElement[];
  structure: Structure;

  private $resource: Observable<Structure>;

  constructor(private route: ActivatedRoute, private structureService: StructureService) {
  }

  ngOnInit() {
    this.calculateElements();
  }

  private calculateElements() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      this.backBoneElements = [];
      // this.structure.id = value.id;
      let res: any;
      if (value.snapshot) {
        res = value.snapshot;
      }
      if (value.differential) {
        res = value.differential;
      }
      const coreElements: CoreElement[] = [];
      if (res.element) {
        for (let i = 0; i < res.element.length; i++) {
          const elm = res.element[i];
          const coreElement = new CoreElement();
          coreElement.path = elm.path;
          coreElement.name = elm.sliceName;
          coreElement.min = elm.min;
          coreElement.max = elm.max;
          if (elm.type) {
            coreElement.type = elm.type[0].code;
            if (elm.type[0].profile) {
              coreElement.profile = elm.type[0].profile[0];
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
    });
  }

  selectResource(resource: string) {
    this.resourceSelected.emit(resource);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateElements();
  }
}


