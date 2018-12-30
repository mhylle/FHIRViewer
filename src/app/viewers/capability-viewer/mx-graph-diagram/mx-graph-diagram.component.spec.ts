import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MxGraphDiagramComponent} from './mx-graph-diagram.component';

describe('MxGraphDiagramComponent', () => {
  let component: MxGraphDiagramComponent;
  let fixture: ComponentFixture<MxGraphDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MxGraphDiagramComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxGraphDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
