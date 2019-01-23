import {Action} from '@ngrx/store';
import {FhirResourceType} from '../../core/model/FhirResourceType';
import Bundle = fhir.Bundle;

export enum BundleActionTypes {
  BundleRequested = '[Home] Bundle Requested',
  BundlesLoaded = '[Bundle API] Bundle Loaded',
  DetermineBundleTypes = '[Home] Determine Bundle Types',
  BundleTypesDetermined = '[Resource Service] Bundle Types Determined'
}

export class BundleRequested implements Action {
  readonly type = BundleActionTypes.BundleRequested;

  constructor() {
  }
}

export class BundleLoaded implements Action {
  readonly type = BundleActionTypes.BundlesLoaded;

  constructor(public payload: { bundle: Bundle }) {
    console.log('bundleLoaded: ' + payload.bundle);
  }
}

export class DetermineBundleTypes implements Action {
  readonly type = BundleActionTypes.DetermineBundleTypes;

  constructor() {
  }
}

export class BundleTypesDetermined implements Action {
  readonly type = BundleActionTypes.BundleTypesDetermined;

  constructor(public payload: { fhirResourceTypes: FhirResourceType[] }) {
    console.log('bundleTypesDetermined: ' + payload.fhirResourceTypes);
  }
}

export type BundleActions = BundleRequested | BundleLoaded
  | DetermineBundleTypes | BundleTypesDetermined;
