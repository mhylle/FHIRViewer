import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import Bundle = fhir.Bundle;


@Component({
  selector: 'app-dependency-viewer',
  templateUrl: './dependency-viewer.component.html',
  styleUrls: ['./dependency-viewer.component.css']
})
export class DependencyViewerComponent implements OnInit {
  bundle$: Observable<Bundle>;

  constructor() {
  }

  ngOnInit() {
  }
}
