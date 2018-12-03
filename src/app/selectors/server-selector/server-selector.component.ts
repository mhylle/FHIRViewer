import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-server-selector',
  templateUrl: './server-selector.component.html',
  styleUrls: ['./server-selector.component.css']
})
export class ServerSelectorComponent implements OnInit {

  availableServers: string[];

  constructor(private router: Router, private configurationService: ConfigurationService) {
  }

  ngOnInit() {
    this.availableServers = environment.resourceServers;
  }

  selectServer(server: string) {
    this.configurationService.changeServer(server);
    this.router.navigate(['/login']);
  }

}
