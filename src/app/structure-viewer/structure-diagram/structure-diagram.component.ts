import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StructureService} from '../../structure.service';
import {Observable} from 'rxjs';
import {Structure} from '../../model/structure';
import {switchMap} from 'rxjs/operators';
import {BackboneElement} from '../../model/backbone-element';

@Component({
  selector: 'app-structure-diagram',
  templateUrl: './structure-diagram.component.html',
  styleUrls: ['./structure-diagram.component.css']
})
export class StructureDiagramComponent implements OnInit {
  private $resource: Observable<Structure>;
  structure: Structure;
  resource: string;

  @Input()
  hideUnused: boolean;

  constructor(private route: ActivatedRoute, private structureService: StructureService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.resource = params.get('resource');
        return this.structureService.getStructure(this.resource);
      }));

    this.$resource.subscribe(value => {
      this.structure = new Structure();
      this.structure.id = value.id;
      let res: any;
      if (value.snapshot) {
        res = value.snapshot;
      }
      if (value.differential) {
        res = value.differential;
      }
      const parentBackBone = new BackboneElement();
      this.createBackBoneElement(parentBackBone, res, null);
    });
  }

  createBackBoneElement(element: BackboneElement, item: any, parent: string) {
    element.items = [];
    if (item.element) {
      for (let i = 0; i < item.element.length; i++) {
        if (parent != null) {
          if (!item.path.startsWith(parent)) {
            continue;
          }
        }
        const elm = item.element[i];
        element.path = elm.path;
        element.name = elm.sliceName;
        element.parent = elm;
        element.min = elm.min;
        element.max = elm.max;
        if (elm.short) {
          element.description = elm.short;
        }
        if (elm.type && elm.type[0].code === 'BackboneElement') {
          const backboneElement = new BackboneElement();
          this.createBackBoneElement(backboneElement, item, item.path);
          element.items.push(backboneElement);
        }
      }
    }
  }


  // oldBackBone(res: any) {
  //   this.structure.definition = res.definition;
  //   if (res.element) {
  //     this.structure.entries = [];
  //     for (let i = 0; i < res.element.length; i++) {
  //       const entry: Entry = new Entry();
  //       const item = res.element[i];
  //       if (item.type) {
  //         if (item.typ) {
  //           const typeElement = item.type[0];
  //           if (typeElement.code === 'BackboneElement') {
  //             const basePath = item.path;
  //             this.createBackBoneElement(item, res);
  //           }
  //         }
  //       }
  //       entry.name = item.sliceName;
  //       entry.path = item.path;
  //       entry.level = DetailedStructureComponent.computeLevel(item.path);
  //       entry.isSummary = item.isSummary;
  //       entry.isModifier = item.isModifier;
  //       entry.min = item.min;
  //       entry.max = item.max;
  //       if (item.code) {
  //         entry.code = item.code;
  //       }
  //       if (item.type) {
  //         const typeElement = item.type[0];
  //         if (typeElement.code === 'Extension') {
  //           entry.type_name = DetailedStructureComponent.stripUrl(typeElement.profile[0]);
  //           entry.type = 'Extension';
  //         } else if (typeElement.code === 'Reference') {
  //           entry.type = 'Reference';
  //           if (typeElement.profile) {
  //             entry.type_name = DetailedStructureComponent.stripUrl(typeElement.profile[0]);
  //           } else if (typeElement.targetProfile) {
  //             entry.type_name = DetailedStructureComponent.stripUrl(typeElement.targetProfile[0]);
  //           }
  //         } else {
  //           entry.type = DetailedStructureComponent.checkType(typeElement.code);
  //           // entry.type = 'data_type';
  //           entry.type_name = typeElement.code;
  //
  //         }
  //       }
  //       entry.description = item.definition;
  //       this.structure.entries.push(entry);
  //     }
  //   }
  // }
}
