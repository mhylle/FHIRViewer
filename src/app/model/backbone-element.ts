export class BackboneElement {
  path: string;
  name: string;
  items: BackboneElement[];
  parent?: BackboneElement;
  min: number;
  max: string;
  description: string;
}
