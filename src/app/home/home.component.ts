import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition', 'label': 'Condition'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'},
    {'name': 'ColumnaEncounter', 'label': 'ColumnaEncounter'}
  ];
  selectedResource: string;
  hideUnused = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  chooseResource() {
    this.router.navigate(['Home', this.selectedResource]);
  }
}
