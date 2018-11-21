import {Component, OnInit} from '@angular/core';
import {StructureService} from '../structure.service';
import {Element} from '../model/element';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {

  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition','label': 'Condition'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'}
    ];
  selectedResource: string;
  element: Element;

  constructor(private structureService: StructureService) {
  }

  ngOnInit() {

  }

  stripUrl(referenceUrl: string) {
    if (!referenceUrl){
      return "";
    }
    return referenceUrl.split('/').pop();
  }

  chooseResource() {
    this.structureService.getStructure(this.selectedResource).subscribe(value => this.element = value);
  }
}
