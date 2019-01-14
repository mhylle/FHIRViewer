import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {structureDefinitionReducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {StructureDefinitionsEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('structureDefinition', structureDefinitionReducer),
    EffectsModule.forFeature([StructureDefinitionsEffects])
  ],
  providers: [StructureDefinitionsEffects]
})
export class StructureDefinitionStoreModule {
}
