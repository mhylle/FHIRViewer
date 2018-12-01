import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-structure',
  templateUrl: './real-structure.component.html',
  styleUrls: ['./real-structure.component.css']
})
export class RealStructureComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;

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
