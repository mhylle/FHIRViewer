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

  stripUrl(referenceUrl: string) {
    if (!isDefined(referenceUrl) || referenceUrl === null || referenceUrl === '') {
      return '';
    }
    return referenceUrl.split('/').pop();
  }

  selectResource(resource: string) {
    this.resourceSelected.emit(resource);
  }
}
