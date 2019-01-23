import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromResource from './structuredefinitions.reducer';
import {ResourceState} from './structuredefinitions.reducer';


export const selectResourceState = createFeatureSelector<ResourceState>('resources');

export const selectResourceByName = (resource: string) => createSelector(
  selectResourceState,
  resourcesState => resourcesState.entities[resource]
);

export const selectAllResources = createSelector(
  selectResourceState,
  fromResource.selectAll
);

export const allResourcesLoaded = createSelector(
  selectResourceState,
  resourceState => resourceState.allResourceLoaded
);

export const selectColumnaResources = createSelector(
  selectAllResources,
  columnaResources => columnaResources.filter(resource => resource.id.startsWith('Columna'))
);
