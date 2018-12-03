import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RepeatPipe} from './core/mh-utils/repeat.pipe';

import {HomeComponent} from './home/home.component';

import {BasicCapabilityComponent} from './viewers/capability-viewer/basic-capability/basic-capability.component';
import {DetailedStructureComponent} from './viewers/structure-viewer/detailed-structure/detailed-structure.component';
import {StructureViewerComponent} from './viewers/structure-viewer/structure-viewer.component';
import {MenuComponent} from './core/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StructureDiagramComponent} from './viewers/structure-viewer/structure-diagram/structure-diagram.component';
import {DiagramElementComponent} from './viewers/structure-viewer/structure-diagram/diagram-element/diagram-element.component';
import {ResourceSelectorComponent} from './selectors/resource-selector/resource-selector.component';
import {MatCheckboxModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {LoginComponent} from './core/login/login.component';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {CapabilityViewerComponent} from './viewers/capability-viewer/capability-viewer.component';
import {StructureDefinitionViewerComponent} from './viewers/structure-viewer/structure-definition-viewer/structure-definition-viewer.component';
import {RealStructureComponent} from './viewers/structure-viewer/real-structure/real-structure.component';
import { MenuItemComponent } from './core/menu/menu-item/menu-item.component';
import { ServerSelectorComponent } from './selectors/server-selector/server-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailedStructureComponent,
    RepeatPipe,
    HomeComponent,
    BasicCapabilityComponent,
    StructureViewerComponent,
    MenuComponent,
    StructureDiagramComponent,
    DiagramElementComponent,
    ResourceSelectorComponent,
    LoginComponent,
    CapabilityViewerComponent,
    StructureDefinitionViewerComponent,
    RealStructureComponent,
    MenuItemComponent,
    ServerSelectorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
