import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MxGraphDiagramComponent} from './mx-graph-diagram.component';
import {ResourceSelectorComponent} from "../../../selectors/resource-selector/resource-selector.component";
import {ResourceDiagramComponent} from "./resource-diagram/resource-diagram.component";
import {FormsModule} from "@angular/forms";
import {MaterialImportModule} from "../../../material-import/material-import.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";

describe('MxGraphDiagramComponent', () => {
  let component: MxGraphDiagramComponent;
  let fixture: ComponentFixture<MxGraphDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MaterialImportModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [MxGraphDiagramComponent, ResourceSelectorComponent, ResourceDiagramComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxGraphDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
