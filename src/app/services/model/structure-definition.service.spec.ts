import {TestBed} from '@angular/core/testing';

import {StructureDefinitionService} from './structure-definition.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CookieService} from 'ngx-cookie-service';
import {ConfigurationService} from '../infrastructure/configuration.service';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

describe('StructureDefinitionService', () => {
  let httpClientSpy: { get: jasmine.Spy };

  let httpMock: HttpTestingController;
  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CookieService, ConfigurationService]
      });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      httpMock = TestBed.get(HttpTestingController);
    }
  );

  it('should be created', () => {
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    expect(service).toBeTruthy();
  });

  it('should retrieve an observable with values when values exist', () => {
    const expectedStructure = '{\'name\': \'aabc}';
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    httpClientSpy.get.and.returnValue(of(expectedStructure));

    service.getStructure('EpisodeOfCare').subscribe(structure => {
      expect(structure).toEqual(expectedStructure, 'Expected result');
      expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });
  });

  it('should retrieve a null observable with values when values does not exist', () => {
    const expectedStructure = null;
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    httpClientSpy.get.and.returnValue(of(null));

    service.getStructure('EpisodeOfCare').subscribe(structure => {
      expect(structure).toEqual(null, 'Expected result');
    });
    const configurationService: ConfigurationService = TestBed.get(ConfigurationService);
    const request = httpMock.expectOne(configurationService.selectedServer + '/fhir/StructureDefinition/EpisodeOfCare');
    request.flush(expectedStructure);

    httpMock.verify();
  });

  it('HAS AN ERROR!! should return an error when the server returns a 404', () => {
    const service: StructureDefinitionService = TestBed.get(StructureDefinitionService);
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(of(errorResponse));
    service.getStructure('EpisodeOfCare').subscribe(
      structure => fail('expected an error not a structure' + structure),
      error => expect(error.message).toContain('tesaasasddadtaa 404 error')
    );
  });
});
