import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import * as structureActions from './actions';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ResourceService} from '../../services/model/resource.service';

@Injectable()
export class BundleEffects {
  @Effect()
  loadRequest$: Observable<Action> = this.actions$.pipe(
    ofType<structureActions.LoadRequestAction>(
      structureActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new structureActions.LoadRequestAction()),
    switchMap(() =>
      this.resourceService
        .bundle
        .pipe(
          map(
            item =>
              new structureActions.LoadSuccessAction({
                item
              })
          ),
          catchError(error =>
            of(new structureActions.LoadFailureAction({error}))
          )
        )
    )
  );

  constructor(private resourceService: ResourceService, private actions$: Actions) {
  }
}
