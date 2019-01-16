import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  serverChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private cookieService: CookieService) {
  }

  static get availableServers() {
    return environment.resourceServers;
  }

  get selectedServer() {
    return this.cookieService.get('selectedServer');
  }

  changeServer(server: string) {
    this.cookieService.set('selectedServer', server);
    this.serverChanged.emit(server);
  }
}
