import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBundle from './bundle.reducer';
import {BundleState} from './bundle.reducer';

export const selectBundleState = createFeatureSelector<BundleState>('bundle');

export const selectBundle = createSelector(
  selectBundleState,
  fromBundle.selectAll
);

export const bundleLoaded = createSelector(
  selectBundleState,
  bundleState => bundleState.bundleLoaded
);

export const selectColumnaBundles = createSelector(
  selectBundle,
  columnaBundles => {
    if (columnaBundles && columnaBundles.length === 1) {
      const theBundle = columnaBundles[0];
      const resources = theBundle.entry
        .filter(elm => elm.resource.id.startsWith('Columna'))
        .sort((a, b) => a.resource.id.localeCompare(b.resource.id));
      return resources;
    }
    return null;
  });



