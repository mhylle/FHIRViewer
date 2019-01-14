import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureDefinitionStoreModule} from './structureDefinitionStore';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {BundleStoreModule} from './bundleStore';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StructureDefinitionStoreModule,
    BundleStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {
}
