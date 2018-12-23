import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceInformationComponent} from './resource-information.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";

describe('ResourceInformationComponent', () => {
  let component: ResourceInformationComponent;
  let fixture: ComponentFixture<ResourceInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ResourceInformationComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
