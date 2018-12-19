import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

import {StructureViewerComponent} from './viewers/structure-viewer/structure-viewer.component';
import {LoginComponent} from './core/login/login.component';
import {CapabilityViewerComponent} from './viewers/capability-viewer/capability-viewer.component';
import {AuthGuard} from './core/auth/auth.guard';
import {ServerGuard} from './core/interceptors/server.guard';
import {ServerSelectorComponent} from './selectors/server-selector/server-selector.component';
import {SvgDiagramComponent} from './viewers/structure-viewer/structure-diagram/svg-diagram/svg-diagram.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'Home/:resource',
    component: HomeComponent,
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'StructureDefinition',
    component: StructureViewerComponent,
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'StructureDefinition/:resource',
    component: StructureViewerComponent,
    pathMatch: 'prefix',
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'CapabilityStatement',
    component: CapabilityViewerComponent,
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'CapabilityStatement/:resource',
    component: CapabilityViewerComponent,
    pathMatch: 'prefix',
    canActivate: [ServerGuard, AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ServerGuard]
  },
  {
    path: 'SVG',
    component: SvgDiagramComponent
  },
  {
    path: 'selectServer',
    component: ServerSelectorComponent
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
