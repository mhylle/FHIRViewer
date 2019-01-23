import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BasicCapabilityComponent} from './viewers/capability-viewer/basic-capability/basic-capability.component';
import {StructureViewerComponent} from './viewers/structure-viewer/structure-viewer.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ResourceSelectorComponent} from './selectors/resource-selector/resource-selector.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {LoginComponent} from './core/login/login.component';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {CapabilityViewerComponent} from './viewers/capability-viewer/capability-viewer.component';
import {StructureDefinitionComponent} from './viewers/structure-viewer/structure-definition/structure-definition.component';
import {ServerSelectorComponent} from './selectors/server-selector/server-selector.component';
import {MenuComponent} from './core/menu/menu.component';
import {MaterialImportModule} from './material-import/material-import.module';
import {NoResourceSelectedComponent} from './viewers/no-resource-selected/no-resource-selected.component';
import {CookieService} from 'ngx-cookie-service';
import {MhUtilsModule} from './core/mh-utils/mh-utils.module';
import {ResourceInformationComponent} from './viewers/capability-viewer/resource-information/resource-information.component';
import {ResourceDiagramComponent} from './viewers/capability-viewer/resource-diagram/resource-diagram/resource-diagram.component';
// tslint:disable-next-line:max-line-length
import {StructureDefinitionElementComponent} from './viewers/structure-viewer/structure-definition/structure-definition-element/structure-definition-element.component';
import {DependencyModule} from './viewers/dependency-viewer/dependency/dependency.module';
import {HomeModule} from './home/home/home.module';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store/reducers';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {CustomSerializer} from './store/utils';

@NgModule({
  declarations: [
    AppComponent,
    BasicCapabilityComponent,
    StructureViewerComponent,
    ResourceSelectorComponent,
    LoginComponent,
    CapabilityViewerComponent,
    StructureDefinitionComponent,
    ServerSelectorComponent,
    MenuComponent,
    NoResourceSelectedComponent,
    ResourceInformationComponent,
    ResourceDiagramComponent,
    StructureDefinitionElementComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MaterialImportModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    MhUtilsModule,
    DependencyModule,
    HomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    CookieService
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
