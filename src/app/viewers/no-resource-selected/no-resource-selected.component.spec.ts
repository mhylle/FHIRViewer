import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResourceSelectedComponent } from './no-resource-selected.component';

describe('NoResourceSelectedComponent', () => {
  let component: NoResourceSelectedComponent;
  let fixture: ComponentFixture<NoResourceSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoResourceSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoResourceSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
