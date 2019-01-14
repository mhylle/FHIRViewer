import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Capability} from '../../core/model/capability';
import {catchError} from 'rxjs/operators';
import {ConfigurationService} from '../infrastructure/configuration.service';
import OperationDefinition = fhir.OperationDefinition;
import CapabilityStatement = fhir.CapabilityStatement;

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

  private static handleCapabilityError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 404) {
        return of<Capability>();
      }
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

  private static handleCapabilityStatementError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 404) {
        return of<CapabilityStatement>();
      }
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

  private static handleOperationError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 404) {
        return of<OperationDefinition>();
      }
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
        catchError(CapabilityService.handleCapabilityError)
      );
  }


  getCapabilityStatement(resource: string): Observable<CapabilityStatement> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<CapabilityStatement>(this.configurationService.selectedServer + '/fhir/metadata/' + resource, httpOptions)
      .pipe(
        catchError(CapabilityService.handleCapabilityStatementError)
      );
  }

  getOperation(operation: string, resource: string): Observable<OperationDefinition> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    const url = this.configurationService.selectedServer + '/fhir/operationDefinition/' + resource + '/' + operation;
    return this.http.get<OperationDefinition>(url, httpOptions)
      .pipe(
        catchError(CapabilityService.handleOperationError)
      );
  }
}
