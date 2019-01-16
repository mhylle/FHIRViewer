import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StructureDefinitionElementComponent} from './structure-definition-element.component';

describe('StructureDefinitionElementComponent', () => {
  let component: StructureDefinitionElementComponent;
  let fixture: ComponentFixture<StructureDefinitionElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StructureDefinitionElementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDefinitionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
