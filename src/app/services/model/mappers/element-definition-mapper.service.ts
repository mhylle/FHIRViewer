import {Injectable} from '@angular/core';
import {DiagramNodeElement} from '../../../viewers/capability-viewer/resource-diagram/model/DiagramNodeElement';
import {SSEElementDefinition} from '../../../core/model/fhir/SSEElementDefinition';
import {SSEElementDefinitionBinding} from '../../../core/model/fhir/SSEElementDefinitionBinding';
import {ModelUtils} from '../../../core/utils/model-utils';
import {StringUtils} from "../../../core/utils/string-utils";
import ElementDefinition = fhir.ElementDefinition;
import ElementDefinitionBinding = fhir.ElementDefinitionBinding;

@Injectable({
  providedIn: 'root'
})
export class ElementDefinitionMapperService {

  constructor() {
  }

  static toFHIR(element: DiagramNodeElement): ElementDefinition {
    let elementDefinition: ElementDefinition;
    elementDefinition = new SSEElementDefinition();
    elementDefinition.path = element.path;
    elementDefinition.min = element.min;
    elementDefinition.max = element.max;
    elementDefinition.short = element.short;
    if (element.binding) {
      let elementDefinitionBinding: ElementDefinitionBinding;
      elementDefinitionBinding = new SSEElementDefinitionBinding();
      elementDefinitionBinding.strength = element.binding.strength;
      elementDefinitionBinding.valueSetUri = element.binding.valueSetUri;
      // if (element.readOnly) {
      //   let constraint = elementDefinition.constraint;
      //   constraint.keys() = 'Readonly';
      // }
      elementDefinition.binding = elementDefinitionBinding;
    }
    elementDefinition.definition = element.description;
    elementDefinition.type = element.type;
    elementDefinition.sliceName = element.name;
    return elementDefinition;
  }

  static fromFHIR(elementDefinition: fhir.ElementDefinition): DiagramNodeElement {
    const diagramNodeElement = new DiagramNodeElement();
    diagramNodeElement.path = elementDefinition.path;
    diagramNodeElement.name = elementDefinition.sliceName;
    diagramNodeElement.min = elementDefinition.min;
    diagramNodeElement.max = elementDefinition.max;
    diagramNodeElement.type = elementDefinition.type;
    diagramNodeElement.short = elementDefinition.short;
    if (elementDefinition.binding) {
      diagramNodeElement.binding = {};
      diagramNodeElement.binding.strength = elementDefinition.binding.strength;
      diagramNodeElement.binding.valueSetUri = elementDefinition.binding.valueSetUri;
    }
    diagramNodeElement.readOnly = ModelUtils.isReadOnly(elementDefinition.constraint);
    diagramNodeElement.description = elementDefinition.definition;

    return diagramNodeElement;
  }

  static isReference(element: DiagramNodeElement): boolean {
    const type = element.type;
    return type && type[0].code === 'Reference';
  }

  static referenceUrl(element: DiagramNodeElement): string {
    if (this.isReference(element)) {
      const type = element.type[0];
      if (type.profile) {
        return StringUtils.stripUrl(type.profile);
      } else if (type.targetProfile) {
        return StringUtils.stripUrl(type.targetProfile);
      }
    }
    return '';
  }
}
