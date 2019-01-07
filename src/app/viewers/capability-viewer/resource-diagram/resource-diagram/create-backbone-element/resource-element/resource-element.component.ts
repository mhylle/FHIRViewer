import {Component, Input, OnInit} from '@angular/core';
import {TypeService} from "../../../../../../services/type.service";
import {DiagramNodeElement} from "../../../model/DiagramNodeElement";
import ElementDefinitionType = fhir.ElementDefinitionType;

export class ResourceElement {
  elementType: ElementDefinitionType
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

}
