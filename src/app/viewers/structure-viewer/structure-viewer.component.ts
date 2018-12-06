import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;
  private $selectedResource: Observable<string>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.$selectedResource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('resource');
      }));

    this.$selectedResource.subscribe(value => this.selectedResource = value);
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
