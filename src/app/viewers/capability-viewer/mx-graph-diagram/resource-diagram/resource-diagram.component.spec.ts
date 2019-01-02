import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceDiagramComponent} from './resource-diagram.component';
import {RouterTestingModule} from "@angular/router/testing";
import {CookieService} from "ngx-cookie-service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ResourceDiagramComponent', () => {
  let component: ResourceDiagramComponent;
  let fixture: ComponentFixture<ResourceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ResourceDiagramComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
