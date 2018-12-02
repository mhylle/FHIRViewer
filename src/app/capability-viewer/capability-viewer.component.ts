import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../services/infrastructure/configuration.service';

@Component({
  selector: 'app-capability-viewer',
  templateUrl: './capability-viewer.component.html',
  styleUrls: ['./capability-viewer.component.css']
})
export class CapabilityViewerComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;

  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit() {
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
