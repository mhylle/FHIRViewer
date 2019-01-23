import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {StructureDefinitionActionTypes, StructureDefinitionsActions} from './structureDefinitions.actions';
import StructureDefinition = fhir.StructureDefinition;

export const adapter: EntityAdapter<StructureDefinition> = createEntityAdapter<StructureDefinition>();

export interface ResourceState extends EntityState<StructureDefinition> {
  allResourceLoaded: boolean;
}

export const initialResourceState: ResourceState = adapter.getInitialState({
  allResourceLoaded: false,
});

export function structuredefinitionsReducer(state = initialResourceState, action: StructureDefinitionsActions): ResourceState {
  switch (action.type) {
    case StructureDefinitionActionTypes.ResourceLoaded:
      return adapter.addOne(action.payload.resource, state);
    case StructureDefinitionActionTypes.AllResourcesLoaded:
      return adapter.addAll(action.payload.resources, {...state, allResourcesLoaded: true});
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
