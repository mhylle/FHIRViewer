import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Capability} from '../core/model/capability';
import {catchError} from 'rxjs/operators';
import {ConfigurationService} from './infrastructure/configuration.service';

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
    // if (this.configurationService.selectedServer === '') {
    //   throwError('No server selected');
    //   return;
    // }
    return this.http.get<Capability>(this.configurationService.selectedServer + '/fhir/metadata/' + resource)
      .pipe(
        catchError(CapabilityService.handleError)
      );
  }
}
