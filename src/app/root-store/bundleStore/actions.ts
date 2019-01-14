import {Action} from '@ngrx/store';
import Bundle = fhir.Bundle;


export enum ActionTypes {
  LOAD_REQUEST = '[Bundle] Load Request',
  LOAD_FAILURE = '[Bundle] Load Failure',
  LOAD_SUCCESS = '[Bundle] Load Success'
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

  constructor(public payload: { item: Bundle }) {
  }
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
