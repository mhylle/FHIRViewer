import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {

  constructor(private http: HttpClient) {
  }

  getServerDescription(): Observable<any> {
    return this.http.get<any>(environment.resourceServers[0] + '/general/description');
  }
}
