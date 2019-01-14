import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import Bundle = fhir.Bundle;

export const resourceAdapter: EntityAdapter<Bundle> = createEntityAdapter<Bundle>({
  selectId: model => model.id,
  sortComparer: (a: Bundle, b: Bundle): number =>
    b.id.localeCompare(a.id)
});

export interface State extends EntityState<Bundle> {
  bundle: Bundle | null;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = resourceAdapter.getInitialState(
  {
    bundle: null,
    isLoading: false,
    error: null
  }
);
