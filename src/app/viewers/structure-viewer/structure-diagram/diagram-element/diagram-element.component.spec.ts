import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagramElementComponent} from './diagram-element.component';
import {CookieService} from 'ngx-cookie-service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DiagramElementComponent', () => {
  let component: DiagramElementComponent;
  let fixture: ComponentFixture<DiagramElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DiagramElementComponent],
      providers: [CookieService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
