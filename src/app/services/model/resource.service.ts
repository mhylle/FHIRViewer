import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from '../infrastructure/configuration.service';
import {Observable} from 'rxjs';
import {AppState} from '../../store/reducers';
import {select, Store} from '@ngrx/store';
import {selectBundle} from '../../store/bundle/bundle.selectors';
import {FhirResourceType} from "../../core/model/FhirResourceType";
import {filter, map} from "rxjs/operators";
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


  constructor(private store: Store<AppState>, private http: HttpClient, private configurationService: ConfigurationService) {
  }

  get bundle(): Observable<any> {
    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    return this.http.get<Bundle>(this.configurationService.selectedServer + '/fhir/StructureDefinition/bundle', httpOptions);
  }

  calculateTypes = map((value: Bundle[]) => {
    const resourceTypes: FhirResourceType[] = [];
    if (value) {
      const bundle = value[0];
      for (let i = 0; i < bundle.entry.length; i++) {
        const entryElement = bundle.entry[i];
        if (entryElement.resource.id.startsWith('Columna')) {
          resourceTypes.push({
            'name': entryElement.resource.id,
            'label': entryElement.resource.id,
            'short': entryElement.resource.id
          });
        }
      }
    }
    return resourceTypes;
  });

  determineBundleTypes(): Observable<FhirResourceType[]> {
    return this.store.pipe(select(selectBundle)).pipe(this.calculateTypes);
  }

// function determineBundleTypes(bundle: Bundle) {
//   console.log('determineBundleTypes');
//   const resourceTypes = [{name: '', label: '', short: ''}];
//   if (bundle) {
//     for (let i = 0; i < bundle.entry.length; i++) {
//       const entryElement = bundle.entry[i];
//       if (entryElement.resource.id.startsWith('Columna')) {
//         resourceTypes.push({
//           'name': entryElement.resource.id,
//           'label': entryElement.resource.id,
//           'short': entryElement.resource.id
//         });
//       }
//     }
//   }
//   resourceTypes.sort((a, b) => a.label.localeCompare(b.label));
//   return resourceTypes;
// }

// determineTypes(): Observable<any[]> {
//
//   const resourceTypes = [];
//   for (let i = 0; i < bundle.entry.length; i++) {
//     const entryElement = bundle.entry[i];
//     if (entryElement.resource.id.startsWith('Columna')) {
//       resourceTypes.push({
//         'name': entryElement.resource.id,
//         'label': entryElement.resource.id,
//         'short': entryElement.resource.id
//       });
//     }
//   }
//   resourceTypes.sort((a, b) => a.label.localeCompare(b.label));
//   return resourceTypes;
// }
}
