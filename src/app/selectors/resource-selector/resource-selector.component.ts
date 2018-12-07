import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-resource-selector',
  templateUrl: './resource-selector.component.html',
  styleUrls: ['./resource-selector.component.css']
})
export class ResourceSelectorComponent implements OnInit {
  hideUnused = true;
  hideReadonly = true;

  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition', 'label': 'Condition'},
    {'name': 'ColumnaIntegrationPatient', 'label': 'ColumnaIntegrationPatient'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'},
    {'name': 'ColumnaEncounter', 'label': 'ColumnaEncounter'},
    {'name': 'ColumnaReferralRequest', 'label': 'ColumnaReferralRequest'}
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
    const urlElement = this.route.snapshot.url[0].path;
    console.log('urlElement: ' + urlElement + ' SelectedResource: ' + this.selectedResource);
    this.router.navigate([urlElement, this.selectedResource]);
  }

  fireHideUnusedChanged() {
    this.hideUnusedChanged.emit(this.hideUnused);
  }

  fireReadOnlyChanged() {
    this.hideReadOnlyChanged.emit(this.hideReadonly);
  }

}
