import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Capability} from '../core/model/capability';
import {catchError} from 'rxjs/operators';
import {ConfigurationService} from './infrastructure/configuration.service';
import OperationDefinition = fhir.OperationDefinition;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CapabilityService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {

  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getCapability(resource: string): Observable<Capability> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<Capability>(this.configurationService.selectedServer + '/fhir/metadata/' + resource, httpOptions)
      .pipe(
        catchError(CapabilityService.handleError)
      );
  }

  getOperation(operation: string, resource: string): Observable<OperationDefinition> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<OperationDefinition>(this.configurationService.selectedServer + '/fhir/operationDefinition/' + resource + '/' + operation, httpOptions)
      .pipe(
        catchError(CapabilityService.handleError)
      );
  }
}
