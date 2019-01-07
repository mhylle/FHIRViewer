import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private elementTypes: string[] = [];

  constructor() {
    this.elementTypes.push('boolean');
    this.elementTypes.push('date');
    this.elementTypes.push('string');
    this.elementTypes.push('date');
    this.elementTypes.push('dateTime');
    this.elementTypes.push('code');
    this.elementTypes.push('CodeableConcept');
    this.elementTypes.push('Coding');
    this.elementTypes.push('Reference');
    this.elementTypes.push('Identifier');
    this.elementTypes.push('Extension');
    this.elementTypes.push('Period');
  }

  get types() {
    return this.elementTypes;
  }
}
