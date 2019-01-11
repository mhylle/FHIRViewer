import {Component, Input, OnInit} from '@angular/core';
import {TypeService} from '../../../../../../services/type.service';
import {DiagramNodeElement} from '../../../model/DiagramNodeElement';
import ElementDefinitionType = fhir.ElementDefinitionType;

export class ResourceElement {
  elementType: ElementDefinitionType;
}

@Component({
  selector: 'app-resource-element',
  templateUrl: './resource-element.component.html',
  styleUrls: ['./resource-element.component.css']
})
export class ResourceElementComponent implements OnInit {
  @Input()
  data: DiagramNodeElement;

  variableType: string;

  constructor(public typeService: TypeService) {
  }

  ngOnInit() {
    if (this.data == null) {
      this.data = new DiagramNodeElement();
    }
  }

  resourceTypeTracker(index, item) {
    return item;
  }

  setCardinality(value: string) {
    switch (value) {
      case 'zeroone':
        this.data.min = 0;
        this.data.max = '1';
        break;
      case 'oneone':
        this.data.min = 1;
        this.data.max = '1';
        break;
      case 'zeromany':
        this.data.min = 0;
        this.data.max = '*';
        break;
      case 'onemany':
        this.data.min = 1;
        this.data.max = '*';
        break;
    }

  }
}
