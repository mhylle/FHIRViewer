import {Element} from './model/element';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) {
  }

  getStructure(): Observable<Element> {
    return this.http.get<Element>('http://localhost:3000/structure');
  }
}
