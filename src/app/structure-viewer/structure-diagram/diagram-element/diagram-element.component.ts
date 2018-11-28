import {Component, Input, OnInit} from '@angular/core';
import {Structure} from '../../../model/structure';

@Component({
  selector: 'app-diagram-element',
  templateUrl: './diagram-element.component.html',
  styleUrls: ['./diagram-element.component.css']
})
export class DiagramElementComponent implements OnInit {

  @Input()
  structure: Structure;
  @Input()
  resource: string;
  @Input()
  hideUnused: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
