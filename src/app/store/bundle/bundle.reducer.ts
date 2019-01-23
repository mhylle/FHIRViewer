import {Action} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import Bundle = fhir.Bundle;
import {BundleActions, BundleActionTypes} from './bundle.actions';

export const adapter: EntityAdapter<Bundle> = createEntityAdapter<Bundle>();

export interface BundleState extends EntityState<Bundle> {
  bundleLoaded: boolean;
  bundleTypesDetermined: boolean;
}

export const initialBundleState: BundleState = adapter.getInitialState({
  bundleLoaded: false,
  bundleTypesDetermined: false
});

export function bundleReducer(state = initialBundleState, action: BundleActions): BundleState {
  switch (action.type) {
    case BundleActionTypes.BundlesLoaded:
      return adapter.addOne(action.payload.bundle, {...state, bundleLoaded: true});
    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
