import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BundleEffects } from './bundle.effects';

describe('StructureDefinitionsEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: BundleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BundleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(BundleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
