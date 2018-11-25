import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityViewerComponent } from './capability-viewer.component';

describe('CapabilityViewerComponent', () => {
  let component: CapabilityViewerComponent;
  let fixture: ComponentFixture<CapabilityViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
