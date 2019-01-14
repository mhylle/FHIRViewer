import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StructureViewerComponent} from './structure-viewer.component';
import {ResourceSelectorComponent} from '../../selectors/resource-selector/resource-selector.component';
import {StructureDefinitionComponent} from './structure-definition/structure-definition.component';
import {NoResourceSelectedComponent} from '../no-resource-selected/no-resource-selected.component';
import {FormsModule} from '@angular/forms';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {MhUtilsModule} from '../../core/mh-utils/mh-utils.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('StructureViewerComponent', () => {
  let component: StructureViewerComponent;
  let fixture: ComponentFixture<StructureViewerComponent>;

  beforeEach(async(() => {
    // noinspection JSIgnoredPromiseFromCall
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, MaterialImportModule, MhUtilsModule],
      declarations: [StructureViewerComponent, ResourceSelectorComponent, StructureDefinitionComponent, NoResourceSelectedComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
