import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private elementTypes: string[] = [];

  constructor() {
    this.elementTypes.push('Address');
    this.elementTypes.push('Age');
    this.elementTypes.push('Annotation');
    this.elementTypes.push('Attachment');
    this.elementTypes.push('base64Binary');
    this.elementTypes.push('boolean');
    this.elementTypes.push('code');
    this.elementTypes.push('CodeableConcept');
    this.elementTypes.push('Coding');
    this.elementTypes.push('ContactPoint');
    this.elementTypes.push('date');
    this.elementTypes.push('dateTime');
    this.elementTypes.push('decimal');
    this.elementTypes.push('Element');
    this.elementTypes.push('HumanName');
    this.elementTypes.push('Identifier');
    this.elementTypes.push('instant');
    this.elementTypes.push('integer');
    this.elementTypes.push('markdown');
    this.elementTypes.push('Period');
    this.elementTypes.push('Quantity');
    this.elementTypes.push('Range');
    this.elementTypes.push('Ratio');
    this.elementTypes.push('Reference');
    this.elementTypes.push('string');
    this.elementTypes.push('Timing');
    this.elementTypes.push('uri');
    this.elementTypes.push('BackboneElement');
    this.elementTypes.push('Dosage');
  }

  get types() {
    return this.elementTypes;
  }
}
