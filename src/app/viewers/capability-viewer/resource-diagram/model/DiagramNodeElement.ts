import ElementDefinitionType = fhir.ElementDefinitionType;

export class DiagramNodeElement {
  name: string;
  min: fhir.unsignedInt;
  max: string;
  type: ElementDefinitionType[];
  readOnly: boolean;
  description: string;
  path: string;
  short: string;
  binding: any;
}
