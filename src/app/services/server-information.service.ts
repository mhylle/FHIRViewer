import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigurationService} from './infrastructure/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ServerInformationService {

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
  }

  getServerDescription(): Observable<any> {
    return this.http.get<any>(this.configurationService.selectedServer + '/general/description');
  }
}
