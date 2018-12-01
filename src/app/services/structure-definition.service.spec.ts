import { TestBed } from '@angular/core/testing';

import { StructureDefinitionService } from './structure-definition.service';

describe('StructureDefinitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    expect(service).toBeTruthy();
  });
});
