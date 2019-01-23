import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  BundleActionTypes,
  BundleLoaded,
  BundleRequested,
} from './bundle.actions';
import {filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {ResourceService} from '../../services/model/resource.service';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {bundleLoaded} from './bundle.selectors';


@Injectable()
export class BundleEffects {

  constructor(private store: Store<AppState>, private actions$: Actions, private resourceService: ResourceService) {
  }

  @Effect()
  loadBundle$ = this.actions$
    .pipe(
      ofType<BundleRequested>(BundleActionTypes.BundleRequested),
      withLatestFrom(this.store.pipe(select(bundleLoaded))),
      filter(([action, hasLoadedBundle]) => !hasLoadedBundle),
      mergeMap(() => this.resourceService.bundle),
      map(bundle => new BundleLoaded({bundle}))
    );
}
