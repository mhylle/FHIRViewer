import StructureDefinition = fhir.StructureDefinition;
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export const structureAdaptor: EntityAdapter<StructureDefinition> = createEntityAdapter<StructureDefinition>({
  selectId: model => model.id,
  sortComparer: (a: StructureDefinition, b: StructureDefinition): number =>
    b.title.localeCompare(a.title)
});

export interface State extends EntityState<StructureDefinition> {
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = structureAdaptor.getInitialState(
  {
    isLoading: false,
    error: null
  }
);
