import {Element} from './model/element';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Structure} from './model/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) {
  }

  getStructure(resource: string): Observable<Structure> {
    return this.http.get<Structure>('http://localhost:3000/structure?resource=' + resource);
  }
}
