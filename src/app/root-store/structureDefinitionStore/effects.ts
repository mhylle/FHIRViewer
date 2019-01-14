import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as structureActions from './actions';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {StructureDefinitionService} from '../../services/model/structure-definition.service';

@Injectable()
export class StructureDefinitionsEffects {
  @Effect()
  loadRequest$: Observable<Action> = this.actions$.pipe(
    ofType<structureActions.LoadRequestAction>(
      structureActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new structureActions.LoadRequestAction()),
    switchMap(action =>
      this.structureDefinitionService
        .getStructures()
        .pipe(
          map(
            items =>
              new structureActions.LoadSuccessAction({
                items
              })
          ),
          catchError(error =>
            of(new structureActions.LoadFailureAction({error}))
          )
        )
    )
  );

  constructor(private structureDefinitionService: StructureDefinitionService, private actions$: Actions) {
  }
}
