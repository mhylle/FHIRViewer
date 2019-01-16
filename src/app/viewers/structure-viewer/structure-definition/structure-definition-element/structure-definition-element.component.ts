import {Component, Input, OnInit} from '@angular/core';
import {StringUtils} from '../../../../core/utils/string-utils';
import {ContextService} from '../../../../services/infrastructure/context.service';
import {ModelUtils} from '../../../../core/utils/model-utils';
import {BreakpointObserver} from '@angular/cdk/layout';
import {animate, state, style, transition, trigger} from '@angular/animations';
import ElementDefinition = fhir.ElementDefinition;

@Component({
  selector: 'app-structure-definition-element',
  templateUrl: './structure-definition-element.component.html',
  styleUrls: ['./structure-definition-element.component.css'],
  animations: [
    trigger(
      'slideIn', [
        state('*', style({'overflow-y': 'hidden'})),
        state('void', style({'overflow-y': 'hidden'})),
        transition('* => void', [
          style({height: '*'}),
          animate(200, style({height: 0}))
        ]),
        transition('void => *', [
          style({height: '0'}),
          animate(200, style({height: '*'}))
        ])
      ]
    )
  ]
})
export class StructureDefinitionElementComponent implements OnInit {

  descriptionVisible: boolean;
  @Input()
  entry: ElementDefinition;
  private hiddenExtension = '';

  constructor(private breakpointObserver: BreakpointObserver, private contextService: ContextService) {
    breakpointObserver.observe([
      '(min-width: 850px)'
    ]).subscribe(result => {
      this.descriptionVisible = result.matches;
    });
  }

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

  static isReadOnly(constraint: fhir.ElementDefinitionConstraint[]) {
    return ModelUtils.isReadOnly(constraint);
  }

  ngOnInit() {
  }

  stripUrl(uri: string): string {
    return StringUtils.stripUrl(uri);
  }

  computeLevel(path: string): number {
    return StringUtils.computeLevel(path);
  }

  computeName(path: string): string {
    return StringUtils.computeName(path);
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

      if (StructureDefinitionElementComponent.checkType(entry.type[0].code) === 'primitive_data_type') {
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

      if (StructureDefinitionElementComponent.checkType(entry.type[0].code) === 'primitive_data_type') {
        return 'Primitive Data Type';
      }
    }
    return 'Data Type';
  }

  setContext(resourceName: string) {
    this.contextService.currentResource = resourceName;
  }

  toggleExtension(extension: string) {
    const currentExtension = this.hiddenExtension;
    this.hiddenExtension = '';
    this.hiddenExtension = currentExtension !== '' ? '' : extension;
  }

  isVisible(resource: string): boolean {
    return this.hiddenExtension && this.hiddenExtension === this.stripUrl(resource);
  }
}
