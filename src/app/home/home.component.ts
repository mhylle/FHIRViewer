import {Component, OnInit} from '@angular/core';
import {ServerInformationService} from '../services/server-information.service';
import {ConfigurationService} from '../services/infrastructure/configuration.service';
import {ResourceService} from '../services/resource.service';

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
  private resourceTypes = [];

  constructor(private configurationService: ConfigurationService,
              private serverInformationService: ServerInformationService,
              private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.configurationService.serverChanged.subscribe(() => this.retrieveServerInformation());
    this.retrieveServerInformation();
    this.resourceService.bundle.subscribe(value => {
      for (let i = 0; i < value.entry.length; i++) {

        const entryElement = value.entry[i];
        if (entryElement.resource.id.startsWith('Columna')) {
          this.resourceTypes.push({'name': entryElement.resource.id, 'label': entryElement.resource.name});
        }
      }
      this.resourceTypes.sort((a, b) => a.label.localeCompare(b.label));
    });
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
