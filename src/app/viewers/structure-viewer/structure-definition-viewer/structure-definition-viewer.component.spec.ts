import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDefinitionViewerComponent } from './structure-definition-viewer.component';

describe('StructureDefinitionViewerComponent', () => {
  let component: StructureDefinitionViewerComponent;
  let fixture: ComponentFixture<StructureDefinitionViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureDefinitionViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDefinitionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
