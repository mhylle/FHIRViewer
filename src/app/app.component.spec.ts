import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MaterialImportModule} from './material-import/material-import.module';
import {MenuComponent} from './core/menu/menu.component';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFontAwesomeModule,
        MaterialImportModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        MenuComponent
      ],
      providers: [CookieService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
