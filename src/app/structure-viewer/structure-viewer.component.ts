import {Component, OnInit} from '@angular/core';
import {StructureService} from '../structure.service';
import {Element} from '../model/element';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {

  element: Element;

  constructor(private structureService: StructureService) {
  }

  ngOnInit() {
    this.structureService.getStructure().subscribe(value => this.element = value);
  }

  stripUrl(referenceUrl: string) {
    return referenceUrl.split('/').pop();
  }
}
