import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

import {StructureViewerComponent} from './structure-viewer/structure-viewer.component';
import {LoginComponent} from './core/login/login.component';
import {CapabilityViewerComponent} from './capability-viewer/capability-viewer.component';
import {StructureDefinitionViewerComponent} from './structure-viewer/structure-definition-viewer/structure-definition-viewer.component';
import {RealStructureComponent} from './structure-viewer/real-structure/real-structure.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'Home/:resource',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'StructureDefinition/:resource',
    component: StructureViewerComponent,
    pathMatch: 'prefix',
    // canActivate: [AuthGuard]
  },
  {
    path: 'RealStructureDefinition/:resource',
    component: RealStructureComponent,
    pathMatch: 'prefix',
    // canActivate: [AuthGuard]
  },
  {
    path: 'RealStructureDefinition',
    component: RealStructureComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'StructureDefinition',
    component: StructureViewerComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'CapabilityStatement/:resource',
    component: CapabilityViewerComponent,
    pathMatch: 'prefix',
    // canActivate: [AuthGuard]
  },
  {
    path: 'CapabilityStatement',
    component: CapabilityViewerComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
