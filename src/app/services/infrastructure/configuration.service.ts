import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../../environments/environment';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  serverChanged: EventEmitter<string> = new EventEmitter<string>();

  private selectedTheme = 'light';
  private theme = new Subject<string>();
  themeChanged = this.theme.asObservable();


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

  get currentTheme() {
    return this.selectedTheme;
  }

  set currentTheme(theme: string) {
    this.selectedTheme = theme;
    console.log('setting theme' + this.selectedTheme);
    this.theme.next(theme);
  }
}
