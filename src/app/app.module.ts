import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepeatPipe} from './core/mh-utils/repeat.pipe';

import {HomeComponent} from './home/home.component';

import {BasicCapabilityComponent} from './viewers/capability-viewer/basic-capability/basic-capability.component';
import {StructureViewerComponent} from './viewers/structure-viewer/structure-viewer.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StructureDiagramComponent} from './viewers/structure-viewer/structure-diagram/structure-diagram.component';
import {DiagramElementComponent} from './viewers/structure-viewer/structure-diagram/diagram-element/diagram-element.component';
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
import {SvgDiagramComponent} from './viewers/structure-viewer/structure-diagram/svg-diagram/svg-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    RepeatPipe,
    HomeComponent,
    BasicCapabilityComponent,
    StructureViewerComponent,
    StructureDiagramComponent,
    DiagramElementComponent,
    ResourceSelectorComponent,
    LoginComponent,
    CapabilityViewerComponent,
    StructureDefinitionComponent,
    ServerSelectorComponent,
    MenuComponent,
    NoResourceSelectedComponent,
    SvgDiagramComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MaterialImportModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CookieService
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
