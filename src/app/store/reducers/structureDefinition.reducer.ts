import * as structureDefinitionActions from '../actions/structureDefinition.action';

export function structureDefinitionReducer(state = [], action: structureDefinitionActions.Action) {
  switch (action.type) {
    case structureDefinitionActions.LOAD_STRUCTURE_DEFINITIONS_SUCCESS:
      return action.payload;
    default: {
      return state;
    }
  }
}
