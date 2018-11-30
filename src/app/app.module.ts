import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RepeatPipe} from './mh-utils/repeat.pipe';

import {HomeComponent} from './home/home.component';

import {BasicCapabilityComponent} from './capability-viewer/basic-capability/basic-capability.component';
import {DetailedStructureComponent} from './structure-viewer/detailed-structure/detailed-structure.component';
import {StructureViewerComponent} from './structure-viewer/structure-viewer.component';
import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {StructureDiagramComponent} from './structure-viewer/structure-diagram/structure-diagram.component';
import {DiagramElementComponent} from './structure-viewer/structure-diagram/diagram-element/diagram-element.component';
import {ResourceSelectorComponent} from './resource-selector/resource-selector.component';
import {MatCheckboxModule} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
