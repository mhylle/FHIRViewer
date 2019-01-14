import {StructureDefinitionStoreState} from './structureDefinitionStore';
import {BundleStoreState} from './bundleStore';

export interface State {
  structureDefinition: StructureDefinitionStoreState.State;
  bundle: BundleStoreState.State;
}
