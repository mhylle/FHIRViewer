import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {State} from './state';
import Bundle = fhir.Bundle;


const getError = (state: State): any => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getBundle = (state: State): any => state.bundle;

export const selectBundleState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('Bundle');

export const selectBundleError: MemoizedSelector<object, any> = createSelector(
  selectBundleState,
  getError
);

export const selectBundleIsLoading: MemoizedSelector<object, boolean> = createSelector(selectBundleState, getIsLoading);

export const selectBundle: MemoizedSelector<object, Bundle> = createSelector(selectBundleState, getBundle);


