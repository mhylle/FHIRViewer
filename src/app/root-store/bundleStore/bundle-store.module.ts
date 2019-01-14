import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {bundleReducer} from './reducer';
import {EffectsModule} from '@ngrx/effects';
import {BundleEffects} from './effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('bundle', bundleReducer),
    EffectsModule.forFeature([BundleEffects])
  ],
  providers: [BundleEffects]
})
export class BundleStoreModule {
}
