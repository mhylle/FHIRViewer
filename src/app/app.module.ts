/* tslint:disable:max-line-length */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HomeComponent} from './home/home.component';

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
import {CreateBackboneElementComponent} from './viewers/capability-viewer/resource-diagram/resource-diagram/create-backbone-element/create-backbone-element.component';
import {ResourceDiagramComponent} from './viewers/capability-viewer/resource-diagram/resource-diagram/resource-diagram.component';
import {ResourceElementComponent} from './viewers/capability-viewer/resource-diagram/resource-diagram/create-backbone-element/resource-element/resource-element.component';
import {EditResourceElementDialogComponent} from './viewers/capability-viewer/resource-diagram/resource-diagram/create-backbone-element/resource-element-dialog/edit-resource-element-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    CreateBackboneElementComponent,
    ResourceElementComponent,
    EditResourceElementDialogComponent
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
    MhUtilsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    CookieService
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  entryComponents: [CreateBackboneElementComponent, EditResourceElementDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
