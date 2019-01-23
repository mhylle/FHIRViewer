import {Action} from '@ngrx/store';
import StructureDefinition = fhir.StructureDefinition;

export enum StructureDefinitionActionTypes {
  ResourceRequested = '[Dependency Diagram] Resource Requested',
  ResourceLoaded = '[StructureDefinition API] Resource Loaded',
  AllResourcesRequested = '[Dependency Diagram] All Resource Requested',
  AllResourcesLoaded = '[StructureDefinition API] All Resource Loaded',
}

export class ResourceRequested implements Action {
  readonly type = StructureDefinitionActionTypes.ResourceRequested;

  constructor(public payload: { resource: string }) {
  }
}

export class ResourceLoaded implements Action {
  readonly type = StructureDefinitionActionTypes.ResourceLoaded;

  constructor(public payload: { resource: StructureDefinition }) {
  }
}

export class AllResourcesRequested implements Action {
  readonly type = StructureDefinitionActionTypes.AllResourcesRequested;
  constructor() {
    console.log('resource requested');
  }
}

export class AllResourcesLoaded implements Action {
  readonly type = StructureDefinitionActionTypes.AllResourcesLoaded;

  constructor(public payload: { resources: StructureDefinition[] }) {
  }
}

export type StructureDefinitionsActions =
  ResourceLoaded
  | ResourceRequested
  | AllResourcesLoaded
  | AllResourcesRequested;
