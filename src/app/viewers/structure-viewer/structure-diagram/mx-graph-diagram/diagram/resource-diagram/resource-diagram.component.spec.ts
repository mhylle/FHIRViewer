import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceDiagramComponent} from './resource-diagram.component';

describe('ResourceDiagramComponent', () => {
  let component: ResourceDiagramComponent;
  let fixture: ComponentFixture<ResourceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceDiagramComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
