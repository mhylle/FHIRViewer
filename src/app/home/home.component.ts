import {Component, OnInit} from '@angular/core';
import {ServerInformationService} from '../services/server-information.service';
import {ConfigurationService} from '../services/infrastructure/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;
  serverDescription: string;

  constructor(private configurationService: ConfigurationService, private serverInformationService: ServerInformationService) {
  }

  ngOnInit() {
    this.configurationService.serverChanged.subscribe(() => this.retrieveServerInformation());
    this.retrieveServerInformation();
  }

  private retrieveServerInformation() {
    this.serverInformationService.getServerDescription().subscribe(value => {
      if (value != null) {
        this.serverDescription = value.description;
      } else {
        this.serverDescription = 'No description returned from the server';
      }
    });
  }

  selectResource(resource: string) {
    this.selectedResource = resource;
  }

  updateReadOnly(hideReadOnly: boolean) {
    this.hideReadonly = hideReadOnly;
  }

  updateUnused(hideUnused: boolean) {
    this.hideUnused = hideUnused;
  }
}
