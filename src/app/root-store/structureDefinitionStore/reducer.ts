import {initialState, State, structureAdaptor} from './state';
import {Actions, ActionTypes} from './actions';

export function structureDefinitionReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      return structureAdaptor.addAll(action.payload.items, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
