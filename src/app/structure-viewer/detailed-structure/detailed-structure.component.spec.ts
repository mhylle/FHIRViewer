import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStructureComponent } from './structure-viewer.component';

describe('StructureViewerComponent', () => {
  let component: DetailedStructureComponent;
  let fixture: ComponentFixture<DetailedStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
