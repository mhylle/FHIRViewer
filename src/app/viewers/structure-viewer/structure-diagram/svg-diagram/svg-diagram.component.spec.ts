import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SvgDiagramComponent} from './svg-diagram.component';

describe('SvgDiagramComponent', () => {
  let component: SvgDiagramComponent;
  let fixture: ComponentFixture<SvgDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SvgDiagramComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
