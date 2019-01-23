import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../../home/home.component';
import {DependencyViewerComponent} from '../dependency-viewer.component';
import {DependencyDiagramComponent} from '../dependency-diagram/dependency-diagram.component';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {structuredefinitionsReducer} from '../../../store/structureDefinitions/structuredefinitions.reducer';
import {StructureDefinitionsEffects} from '../../../store/structureDefinitions/structuredefinitions.effects';

export const dependencyRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Dependencies',
    component: DependencyViewerComponent
  }
];

@NgModule({
  declarations: [
    DependencyViewerComponent,
    DependencyDiagramComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dependencyRoutes),
    EffectsModule.forFeature([StructureDefinitionsEffects]),
    StoreModule.forFeature('resources', structuredefinitionsReducer),
  ],
  exports: [
    DependencyViewerComponent
  ]
})
export class DependencyModule {
}
