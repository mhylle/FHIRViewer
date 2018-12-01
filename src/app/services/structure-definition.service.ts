import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import StructureDefinition = fhir.StructureDefinition;

@Injectable({
  providedIn: 'root'
})
export class StructureDefinitionService {
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getStructure(resource: string): Observable<StructureDefinition> {
    return this.http.get<StructureDefinition>(environment.resourceServers[0] + '/structure?resource=' + resource)
      .pipe(
        catchError(this.handleError)
      );
  }
}
