import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditResourceElementDialogComponent} from './edit-resource-element-dialog.component';

describe('EditResourceElementDialogComponent', () => {
  let component: EditResourceElementDialogComponent;
  let fixture: ComponentFixture<EditResourceElementDialogComponent>;

  beforeEach(async(() => {
    // noinspection JSIgnoredPromiseFromCall
    TestBed.configureTestingModule({
      declarations: [EditResourceElementDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
