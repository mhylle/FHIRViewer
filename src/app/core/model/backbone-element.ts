import {CoreElement} from './coreElement';

export class BackboneElement {
  path: string;
  name: string;
  items: CoreElement[];
  parent?: BackboneElement;
  min: number;
  max: string;
  description: string;
}
