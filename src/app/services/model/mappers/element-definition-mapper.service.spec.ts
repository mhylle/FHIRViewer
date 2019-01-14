import {TestBed} from '@angular/core/testing';

import {ElementDefinitionMapperService} from './element-definition-mapper.service';

describe('ElementDefinitionMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElementDefinitionMapperService = TestBed.get(ElementDefinitionMapperService);
    expect(service).toBeTruthy();
  });
});
