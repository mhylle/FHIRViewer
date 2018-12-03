import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCapabilityComponent } from './basic-capability.component';

describe('BasicCapabilityComponent', () => {
  let component: BasicCapabilityComponent;
  let fixture: ComponentFixture<BasicCapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
