import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuComponent} from './menu.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MaterialImportModule} from '../../material-import/material-import.module';
import {CookieService} from 'ngx-cookie-service';
import {RouterTestingModule} from "@angular/router/testing";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFontAwesomeModule, RouterTestingModule, MaterialImportModule],
      declarations: [MenuComponent],
      providers: [CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
