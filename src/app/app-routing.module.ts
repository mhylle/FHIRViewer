import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

import {StructureViewerComponent} from './viewers/structure-viewer/structure-viewer.component';
import {LoginComponent} from './core/login/login.component';
import {CapabilityViewerComponent} from './viewers/capability-viewer/capability-viewer.component';
import {AuthGuard} from './core/auth/auth.guard';
import {ServerGuard} from './core/interceptors/server.guard';
import {ServerSelectorComponent} from './selectors/server-selector/server-selector.component';
import {DialogTestComponent} from "./viewers/capability-viewer/resource-diagram/resource-diagram/dialog-test/dialog-test.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'Home'}
  },
  {
    path: 'Home/:resource',
    component: HomeComponent,
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'Home'}
  },
  {
    path: 'StructureDefinition',
    component: StructureViewerComponent,
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'StructureDefinition'}
  },
  {
    path: 'StructureDefinition/:resource',
    component: StructureViewerComponent,
    pathMatch: 'prefix',
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'StructureDefinition'}
  },
  {
    path: 'CapabilityStatement',
    component: CapabilityViewerComponent,
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'CapabilityStatement'}
  },
  {
    path: 'CapabilityStatement/:resource',
    component: CapabilityViewerComponent,
    pathMatch: 'prefix',
    canActivate: [ServerGuard, AuthGuard],
    data: {routeName: 'CapabilityStatement'}
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ServerGuard],
    data: {'routeName': 'Login'}
  },
  {
    path: 'CreateResource',
    component: DialogTestComponent
  },
  {
    path: 'selectServer',
    component: ServerSelectorComponent,
    data: {routeName: 'ServerSelector'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
