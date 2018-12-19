import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialImportModule} from '../material-import/material-import.module';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFontAwesomeModule, MaterialImportModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
