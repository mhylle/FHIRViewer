import {Component, OnInit} from '@angular/core';
import {ServerInformationService} from '../services/server-information.service';

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

  constructor(private serverInformationService: ServerInformationService) {
  }

  ngOnInit() {
    this.serverInformationService.getServerDescription().subscribe(value => {
      this.serverDescription = value.description;
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
