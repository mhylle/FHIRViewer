import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResourceElementComponent} from './resource-element.component';

describe('ResourceElementComponent', () => {
  let component: ResourceElementComponent;
  let fixture: ComponentFixture<ResourceElementComponent>;

  beforeEach(async(() => {
    // noinspection JSIgnoredPromiseFromCall
    TestBed.configureTestingModule({
      declarations: [ResourceElementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
