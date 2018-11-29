import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {StructureService} from '../structure.service';
import {Structure} from '../model/structure';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {
  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition', 'label': 'Condition'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'},
    {'name': 'ColumnaEncounter', 'label': 'ColumnaEncounter'}
  ];
  selectedResource: string;
  hideUnused = true;
  private structure: Structure;
  // private $resource: Observable<Structure>;

  @Output()
  resourceUpdated: EventEmitter<Structure> = new EventEmitter<Structure>();
  private $resource: Observable<Structure>;

  constructor(private router: Router, private route: ActivatedRoute, private structureService: StructureService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
  }

  chooseResource() {
    this.structureService.getStructure(this.selectedResource).subscribe(value => this.structure = value);
    this.router.navigate(['StructureDefinition', this.selectedResource]);
  }

  selectResource(resource: string) {
    this.selectedResource = resource;
  }

}
