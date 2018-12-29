import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BackboneElement} from '../../../../core/model/backbone-element';
import {StringUtils} from "../../../../core/utils/string-utils";

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
    return StringUtils.stripUrl(referenceUrl);
  }
}
