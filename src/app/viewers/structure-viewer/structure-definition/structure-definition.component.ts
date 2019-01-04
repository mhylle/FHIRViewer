import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {StructureDefinitionService} from '../../../services/structure-definition.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StringUtils} from "../../../core/utils/string-utils";
import {ModelUtils} from "../../../core/utils/model-utils";
import ElementDefinition = fhir.ElementDefinition;
import StructureDefinition = fhir.StructureDefinition;

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css']
})
export class StructureDefinitionComponent implements OnInit {
  descriptionVisible: boolean;
  json: string;

  constructor(private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private structureService: StructureDefinitionService) {
    breakpointObserver.observe([
      '(min-width: 850px)'
    ]).subscribe(result => {
      this.descriptionVisible = result.matches;
    });
  }

  structureDefinition: StructureDefinition;
  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;

  @Input()
  resource: string;

  structure: any;
  private result: string;
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
        this.structureDefinition = value.resource;
        this.structure = value.resource;
      }
    });
  }

  computeLevel(path: string): number {
    return StringUtils.computeLevel(path);
  }

  computeName(path: string): string {
    return StringUtils.computeName(path);
  }

  stripUrl(referenceUrl: any) {
    return StringUtils.stripUrl(referenceUrl);
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

  showJson() {
    this.structureService.save(this.structureDefinition).subscribe(value => this.result = value);
  }

  isReadOnly(constraint: fhir.ElementDefinitionConstraint[]) {
    if (ModelUtils) {
      return ModelUtils.isReadOnly(constraint);
    }
    return false;
  }
}
