import {TestBed} from '@angular/core/testing';

import {StructureDefinitionService} from './structure-definition.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';

describe('StructureDefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    expect(service).toBeTruthy();
  });
});
