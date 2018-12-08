import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {StructureDefinitionService} from '../../../services/structure-definition.service';
import {isDefined} from '@angular/compiler/src/util';
import ElementDefinition = fhir.ElementDefinition;

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private structureService: StructureDefinitionService) {
  }
  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;

  @Input()
  resource: string;

  structure: any;
  baseResource: string;
  private $resource: Observable<any>;

  static checkType(code: string) {
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
      if (value.resource) {
        this.structure = value.resource;
      }
    });
  }

  computeLevel(path: string): number {
    if (path == null) {
      return 0;
    }
    const match = path.match(/\./g);
    return (match || []).length;
  }

  computeName(path: string): string {
    if (!isDefined(path) || path === null) {
      return;
    }
    if (!path.match(/\./g)) {
      return path;
    }

    const finalDotPosition = path.lastIndexOf('.');
    return path.substring(finalDotPosition + 1, path.length);
  }

  stripUrl(referenceUrl: any) {
    if (!isDefined(referenceUrl) || referenceUrl === '') {
      return '';
    }
    if (referenceUrl instanceof Array) {
      return referenceUrl[0].split('/').pop();
    }

    return referenceUrl.split('/').pop().trim();
  }

  resolveIcon(entry: ElementDefinition) {
    if (entry.type && entry.type instanceof Array) {
      if (entry.type[0].code === 'Reference') {
        return 'reference.png';
      }
      if (entry.type[0].code === 'Extension') {
        return 'extension_simple.png';
      }

      if (entry.type[0].code === 'BackboneElement') {
        return 'element.gif';
      }

      if (StructureDefinitionComponent.checkType(entry.type[0].code) === 'primitive_data_type') {
        return 'primitive.png';
      }
    }
    return 'datatype.gif';
  }

  resolveIconTitle(entry: ElementDefinition) {
    if (entry.type && entry.type instanceof Array) {
      if (entry.type[0].code === 'Reference') {
        return 'Reference to another resource';
      }
      if (entry.type[0].code === 'Extension') {
        return 'Data Type';
      }

      if (entry.type[0].code === 'BackboneElement') {
        return 'Element';
      }

      if (StructureDefinitionComponent.checkType(entry.type[0].code) === 'primitive_data_type') {
        return 'Primitive Data Type';
      }
    }
    return 'Data Type';
  }

  // <div class="entry_icon" *ngIf="entry.type === 'Reference' || entry.type[0].code === 'Reference'"><img
  //               src="../../../../assets/icon_reference.png"
  //               title="Reference to another resource"></div>
  //             <div class="entry_icon" *ngIf="entry.type === 'code' || entry.type[0].code === 'code'"><img
  //               src="../../../../assets/icon_primitive.png"
  //               title="Primitive data type"></div>
  //             <div class="entry_icon" *ngIf="entry.type === 'Extension' || entry.type[0].code ==='Extension'"><img
  //               src="../../../../assets/icon_extension_simple.png"
  //               title="Data type"></div>
  //             <div class="entry_icon" *ngIf="entry.type === 'data_type' || entry.type[0].code ==='data_type'"><img
  //               src="../../../../assets/icon_datatype.gif"
  //               title="Data type"></div>
  //             <div class="entry_icon" *ngIf="entry.type === 'BackboneElement' || entry.type[0].code ==='BackboneElement'"><img
  //               src="../../../../assets/icon_element.gif"
  //               title="Element"></div>
  //             <div class="entry_icon"
  //                  *ngIf="entry.type === 'primitive_data_type' || entry.type[0].code ==='primitive_data_type'"><img
  //               src="../../../../assets/icon_primitive.png"
  //               title="Data type"></div>
}
