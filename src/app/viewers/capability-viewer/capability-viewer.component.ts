import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-capability-viewer',
  templateUrl: './capability-viewer.component.html',
  styleUrls: ['./capability-viewer.component.css']
})
export class CapabilityViewerComponent implements OnInit {
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
    if (this.route.snapshot.paramMap.get('resource') != null) {
      this.$selectedResource.subscribe(value => this.selectedResource = value);
    }
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
