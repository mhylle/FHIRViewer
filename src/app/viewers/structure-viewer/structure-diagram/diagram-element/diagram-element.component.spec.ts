import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramElementComponent } from './diagram-element.component';

describe('DiagramElementComponent', () => {
  let component: DiagramElementComponent;
  let fixture: ComponentFixture<DiagramElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramElementComponent ]
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
