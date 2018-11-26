import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RepeatPipe} from './mh-utils/repeat.pipe';

import {HomeComponent} from './home/home.component';

import {BasicCapabilityComponent} from './capability-viewer/basic-capability/basic-capability.component';
import {DetailedCapabilityComponent} from './capability-viewer/detailed-capability/detailed-capability.component';
import {DetailedStructureComponent} from './structure-viewer/detailed-structure/detailed-structure.component';
import { StructureViewerComponent } from './structure-viewer/structure-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailedStructureComponent,
    RepeatPipe,
    HomeComponent,
    BasicCapabilityComponent,
    DetailedCapabilityComponent,
    StructureViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
