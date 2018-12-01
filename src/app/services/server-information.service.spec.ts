import { TestBed } from '@angular/core/testing';

import { ServerInformationService } from './server-information.service';

describe('ServerInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerInformationService = TestBed.get(ServerInformationService);
    expect(service).toBeTruthy();
  });
});
