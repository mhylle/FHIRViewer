import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {RouterModule} from '@angular/router';
import {DependencyModule} from '../../viewers/dependency-viewer/dependency/dependency.module';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BundleEffects} from '../../store/bundle/bundle.effects';
import {bundleReducer} from '../../store/bundle/bundle.reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    MaterialImportModule,
    RouterModule,
    EffectsModule.forFeature([BundleEffects]),
    StoreModule.forFeature('bundle', bundleReducer),
    DependencyModule
  ],
  exports: [HomeComponent]
})
export class HomeModule {
}
