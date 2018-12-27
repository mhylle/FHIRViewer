import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.selectedResource = params.get('resource'));
  }

  updateReadOnly(hideReadOnly: boolean) {
    this.hideReadonly = hideReadOnly;
  }

  updateUnused(hideUnused: boolean) {
    this.hideUnused = hideUnused;
  }
}
