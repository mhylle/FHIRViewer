import {Action} from '@ngrx/store';
import StructureDefinition = fhir.StructureDefinition;

export enum ActionTypes {
  LOAD_REQUEST = '[StructureDefinition] Load Request',
  LOAD_FAILURE = '[StructureDefinition] Load Failure',
  LOAD_SUCCESS = '[StructureDefinition] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: StructureDefinition[] }) {
  }
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
