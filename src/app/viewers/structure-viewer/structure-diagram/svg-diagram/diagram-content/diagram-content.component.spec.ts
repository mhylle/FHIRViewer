import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagramContentComponent} from './diagram-content.component';

describe('DiagramContentComponent', () => {
  let component: DiagramContentComponent;
  let fixture: ComponentFixture<DiagramContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiagramContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
