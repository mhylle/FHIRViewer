import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StructureViewerComponent} from './structure-viewer/structure-viewer.component';
import {CapabilityViewerComponent} from './capability-viewer/capability-viewer.component';
import {HomeComponent} from './home/home.component';

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
    component: CapabilityViewerComponent
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
