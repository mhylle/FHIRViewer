import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealStructureComponent } from './real-structure.component';

describe('RealStructureComponent', () => {
  let component: RealStructureComponent;
  let fixture: ComponentFixture<RealStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
