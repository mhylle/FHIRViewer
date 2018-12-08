import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from './infrastructure/configuration.service';
import {Observable} from 'rxjs';
import Bundle = fhir.Bundle;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
  }

  get bundle(): Observable<any> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<Bundle>(this.configurationService.selectedServer + '/fhir/StructureDefinition/', httpOptions);
  }


}
