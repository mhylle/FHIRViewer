import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailedCapabilityComponent} from './capability-viewer/detailed-capability/detailed-capability.component';
import {StructureViewerComponent} from './structure-viewer/structure-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'StructureDefinition/:resource',
    component: StructureViewerComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'StructureDefinition',
    component: StructureViewerComponent,
  },
  {
    path: 'CapabilityStatement',
    component: DetailedCapabilityComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
