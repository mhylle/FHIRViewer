import {createSelector, MemoizedSelector} from '@ngrx/store';
import {StructureDefinitionStoreSelectors} from './structureDefinitionStore';
import {BundleStoreSelectors} from './bundleStore';


export const selectError: MemoizedSelector<object, string> = createSelector(
  StructureDefinitionStoreSelectors.selectStructureDefinitionError,
  BundleStoreSelectors.selectBundleError,
  (structureDefinitionError: string, bundleError: string) => {
    return structureDefinitionError || bundleError;
  }
);
