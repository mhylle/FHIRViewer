export class SSEElementDefinitionBinding {
  _description: fhir.Element;
  _fhir_comments: fhir.Element[];
  _id: fhir.Element;
  _strength: fhir.Element;
  _valueSetUri: fhir.Element;
  description: string;
  extension: fhir.Extension[];
  fhir_comments: string[];
  id: string;
  strength: fhir.code;
  valueSetReference: fhir.Reference;
  valueSetUri: fhir.uri;
}
