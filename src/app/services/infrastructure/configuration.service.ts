import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  selectedServer: string;
  serverChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  changeServer(server: string) {
    this.selectedServer = server;
    this.serverChanged.emit(server);
  }
}
