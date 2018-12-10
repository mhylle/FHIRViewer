import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackboneElement} from '../../../../core/model/backbone-element';
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
  @Input()
  hideReadonly: boolean;

  @Output()
  resourceSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  stripUrl(referenceUrl: any) {
    if (!isDefined(referenceUrl) || referenceUrl === '') {
      return '';
    }
    if (referenceUrl instanceof Array) {
      return referenceUrl[0].split('/').pop();
    }

    return referenceUrl.split('/').pop().trim();
  }
}
