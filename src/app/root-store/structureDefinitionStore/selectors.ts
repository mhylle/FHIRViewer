import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';


import {State, structureAdaptor} from './state';
import StructureDefinition = fhir.StructureDefinition;

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectStructureDefinitionState: MemoizedSelector<object, State>
  = createFeatureSelector<State>('StructureDefinition');

export const selectAllStructureDefinitionItems: (state: object)
  => StructureDefinition[] = structureAdaptor.getSelectors(selectStructureDefinitionState).selectAll;


export const selectStructureDefinitionById = (id: string) =>
  createSelector(this.selectAllStructureDefinitionItems, (allStructureDefinitions: StructureDefinition[]) => {
    if (allStructureDefinitions) {
      return allStructureDefinitions.find(p => p.id === id);
    } else {
      return null;
    }
  });

export const selectStructureDefinitionError: MemoizedSelector<object, any> = createSelector(
  selectStructureDefinitionState,
  getError
);

