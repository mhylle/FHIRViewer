import { TestBed } from '@angular/core/testing';

import { CapabilityService } from './capability.service';

describe('CapabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapabilityService = TestBed.get(CapabilityService);
    expect(service).toBeTruthy();
  });
});
