import {Component, Input, OnInit} from '@angular/core';
import {StructureService} from '../../structure.service';
import {Entry} from '../../model/entry';
import {Structure} from '../../model/structure';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detailed-structure',
  templateUrl: './detailed-structure.component.html',
  styleUrls: ['./detailed-structure.component.css']
})
export class DetailedStructureComponent implements OnInit {

  constructor(private route: ActivatedRoute, private structureService: StructureService) {
  }

  @Input()
  hideUnused = true;

  structure: Structure;
  baseResource: string;
  private $resource: Observable<Structure>;

  static computeLevel(path: string): number {
    const match = path.match(/\./g);
    return (match || []).length;
  }

  static stripUrl(referenceUrl: string) {
    if (!referenceUrl) {
      return '';
    }
    return referenceUrl.split('/').pop();
  }

  private static checkType(code: string) {
    switch (code) {
      case 'boolean':
      case'integer':
      case 'string':
      case 'decimal':
      case 'uri':
      case 'base64Binary':
      case 'instant':
      case 'date':
      case 'dateTime':
      case 'time':
      case 'code':
      case 'oid':
      case 'id':
      case 'markdown':
      case 'unsignedInt':
      case 'positiveInt':
        return 'primitive_data_type';
      default:
        return 'data_type';
    }
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      this.baseResource = JSON.stringify(value);
      this.structure = new Structure();
      this.structure.id = value.id;
      let res: any;
      if (value.snapshot) {
        res = value.snapshot;
      }
      if (value.differential) {
        res = value.differential;
      }
      this.structure.definition = res.definition;
      if (res.element) {
        this.structure.entries = [];
        for (let i = 0; i < res.element.length; i++) {
          const entry: Entry = new Entry();
          const item = res.element[i];
          entry.name = item.sliceName;
          entry.path = item.path;
          entry.level = DetailedStructureComponent.computeLevel(item.path);
          entry.isSummary = item.isSummary;
          entry.isModifier = item.isModifier;
          entry.min = item.min;
          entry.max = item.max;
          if (item.code) {
            entry.code = item.code;
          }
          if (item.type) {
            const typeElement = item.type[0];
            if (typeElement.code === 'Extension') {
              entry.type_name = DetailedStructureComponent.stripUrl(typeElement.profile[0]);
              entry.type = 'Extension';
            } else if (typeElement.code === 'Reference') {
              entry.type = 'Reference';
              if (typeElement.profile) {
                entry.type_name = DetailedStructureComponent.stripUrl(typeElement.profile[0]);
              } else if (typeElement.targetProfile) {
                entry.type_name = DetailedStructureComponent.stripUrl(typeElement.targetProfile[0]);
              }
            } else {
              entry.type = DetailedStructureComponent.checkType(typeElement.code);
              // entry.type = 'data_type';
              entry.type_name = typeElement.code;

            }
          }
          entry.description = item.definition;
          this.structure.entries.push(entry);
        }
      }
      // entry.name
    });
  }
}
