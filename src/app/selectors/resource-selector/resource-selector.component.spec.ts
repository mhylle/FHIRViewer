import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceSelectorComponent} from './resource-selector.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('ResourceSelectorComponent', () => {
  let component: ResourceSelectorComponent;
  let fixture: ComponentFixture<ResourceSelectorComponent>;

  beforeEach(async(() => {
    // noinspection JSIgnoredPromiseFromCall
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, RouterTestingModule, HttpClientTestingModule, MaterialImportModule],
      declarations: [ResourceSelectorComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
