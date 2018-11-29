import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedCapabilityComponent } from './detailed-capability.component';

describe('DetailedCapabilityComponent', () => {
  let component: DetailedCapabilityComponent;
  let fixture: ComponentFixture<DetailedCapabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedCapabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedCapabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
