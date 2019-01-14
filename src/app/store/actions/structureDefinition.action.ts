import Bundle = fhir.Bundle;

export const LOAD_STRUCTURE_DEFINITIONS = 'LOAD_STRUCTURE_DEFINITIONS';
export const LOAD_STRUCTURE_DEFINITIONS_SUCCESS = 'LOAD_STRUCTURE_DEFINITIONS_SUCCESS';

export class LoadStructureDefinitionsAction {
  readonly type = LOAD_STRUCTURE_DEFINITIONS;

  constructor() {
  }
}

export class LoadStructureDefinitionsSuccessAction {
  readonly type = LOAD_STRUCTURE_DEFINITIONS_SUCCESS;

  constructor(public payload: Bundle) {
  }
}

export type Action
  = LoadStructureDefinitionsAction
  | LoadStructureDefinitionsSuccessAction;


