import {TestBed} from '@angular/core/testing';

import {ServerInformationService} from './server-information.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('ServerInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: ServerInformationService = TestBed.get(ServerInformationService);
    expect(service).toBeTruthy();
  });
});
