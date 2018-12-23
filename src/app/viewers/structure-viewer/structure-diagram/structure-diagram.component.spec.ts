import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StructureDiagramComponent} from './structure-diagram.component';
import {DiagramElementComponent} from "./diagram-element/diagram-element.component";
import {RouterTestingModule} from "@angular/router/testing";
import {CookieService} from "ngx-cookie-service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('StructureDiagramComponent', () => {
  let component: StructureDiagramComponent;
  let fixture: ComponentFixture<StructureDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [StructureDiagramComponent, DiagramElementComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
