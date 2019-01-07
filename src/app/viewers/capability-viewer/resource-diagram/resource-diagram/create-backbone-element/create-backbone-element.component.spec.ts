import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateBackboneElementComponent} from './create-backbone-element.component';

describe('CreateBackboneElementComponent', () => {
  let component: CreateBackboneElementComponent;
  let fixture: ComponentFixture<CreateBackboneElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBackboneElementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBackboneElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
