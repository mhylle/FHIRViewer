import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ResourceService} from '../../services/resource.service';

@Component({
  selector: 'app-resource-selector',
  templateUrl: './resource-selector.component.html',
  styleUrls: ['./resource-selector.component.css']
})
export class ResourceSelectorComponent implements OnInit {
  hideUnused = true;
  hideReadonly = true;

  resourceTypes = [];
  selectedResource: string;

  @Output()
  resourceSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  hideUnusedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  hideReadOnlyChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private $resource: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute, private resourceService: ResourceService) {
  }

  ngOnInit() {
    this.resourceTypes = [];
    this.resourceService.bundle.subscribe(value => {
      for (let i = 0; i < value.entry.length; i++) {

        const entryElement = value.entry[i];
        if (entryElement.resource.id.startsWith('Columna')) {
          this.resourceTypes.push({'name': entryElement.resource.id, 'label': entryElement.resource.name});
        }
      }
    });
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('resource');
      }));
  }

  fireResourceChanged() {
    const urlElement = this.route.snapshot.url[0].path;
    console.log('urlElement: ' + urlElement + ' SelectedResource: ' + this.selectedResource);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate([urlElement, this.selectedResource]);
  }

  fireHideUnusedChanged() {
    this.hideUnusedChanged.emit(this.hideUnused);
  }

  fireReadOnlyChanged() {
    this.hideReadOnlyChanged.emit(this.hideReadonly);
  }
}
