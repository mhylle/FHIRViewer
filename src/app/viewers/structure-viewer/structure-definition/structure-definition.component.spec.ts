import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StructureDefinitionComponent} from './structure-definition.component';
import {CookieService} from 'ngx-cookie-service';
import {MhUtilsModule} from '../../../core/mh-utils/mh-utils.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StructureDefinitionComponent', () => {
  let component: StructureDefinitionComponent;
  let fixture: ComponentFixture<StructureDefinitionComponent>;

  beforeEach(async(() => {
    // noinspection JSIgnoredPromiseFromCall
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MhUtilsModule],
      declarations: [StructureDefinitionComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
