import {TestBed} from '@angular/core/testing';

import {GlobalPubSubService} from './global-pub-sub.service';

describe('GlobalPubSubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalPubSubService = TestBed.get(GlobalPubSubService);
    expect(service).toBeTruthy();
  });
});
