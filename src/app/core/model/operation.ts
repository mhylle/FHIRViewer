import OperationDefinitionParameter = fhir.OperationDefinitionParameter;

export class Operation {
  name: string;
  reference: string;
  description: string;
  example: string;
  parameters: OperationDefinitionParameter[];
  inParameters: OperationDefinitionParameter[];
}
