import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {
  hideUnused = true;
  hideReadonly = true;
  selectedResource: string;

  constructor() {
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
