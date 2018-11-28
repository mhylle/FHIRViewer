import {Component, Input, OnInit} from '@angular/core';
import {BackboneElement} from '../../../model/backbone-element';
import {isDefined} from '@angular/compiler/src/util';

@Component({
  selector: 'app-diagram-element',
  templateUrl: './diagram-element.component.html',
  styleUrls: ['./diagram-element.component.css']
})
export class DiagramElementComponent implements OnInit {

  @Input()
  backboneElement: BackboneElement;

  @Input()
  hideUnused: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  stripUrl(referenceUrl: string) {
    if (!isDefined(referenceUrl) || referenceUrl === null || referenceUrl === '') {
      return '';
    }
    return referenceUrl.split('/').pop();
  }
}
