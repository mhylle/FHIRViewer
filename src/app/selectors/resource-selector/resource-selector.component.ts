import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-resource-selector',
  templateUrl: './resource-selector.component.html',
  styleUrls: ['./resource-selector.component.css']
})
export class ResourceSelectorComponent implements OnInit, OnChanges {
  hideUnused = true;
  hideReadonly = true;

  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition', 'label': 'Condition'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'},
    {'name': 'ColumnaEncounter', 'label': 'ColumnaEncounter'}
  ];

  selectedResource: string;

  @Output()
  resourceSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  hideUnusedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  hideReadOnlyChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private $resource: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('resource');
      }));
  }

  fireResourceChanged() {
    console.log('resource changed');
    const urlElement = this.route.snapshot.url[0].path;
    this.router.navigate([urlElement, this.selectedResource]);
  }

  fireHideUnusedChanged() {
    this.hideUnusedChanged.emit(this.hideUnused);
  }

  fireReadOnlyChanged() {
    this.hideReadOnlyChanged.emit(this.hideReadonly);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('resource changed');
    const urlElement = this.route.snapshot.url[0].path;
    this.router.navigate([urlElement, this.selectedResource]);
  }
}
