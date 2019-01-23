import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { StructureDefinitionsEffects } from './structuredefinitions.effects';

describe('StructureDefinitionsEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: StructureDefinitionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StructureDefinitionsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(StructureDefinitionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
