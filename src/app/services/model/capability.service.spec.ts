import {TestBed} from '@angular/core/testing';

import {CapabilityService} from './capability.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('CapabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: CapabilityService = TestBed.get(CapabilityService);
    expect(service).toBeTruthy();
  });
});
