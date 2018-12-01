import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {StructureDefinitionService} from '../../services/structure-definition.service';
import {isDefined} from '@angular/compiler/src/util';
import StructureDefinition = fhir.StructureDefinition;

@Component({
  selector: 'app-structure-definition-viewer',
  templateUrl: './structure-definition-viewer.component.html',
  styleUrls: ['./structure-definition-viewer.component.css']
})
export class StructureDefinitionViewerComponent implements OnInit {
  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;

  @Input()
  resource: string;

  structure: StructureDefinition;
  baseResource: string;
  private $resource: Observable<StructureDefinition>;

  constructor(private route: ActivatedRoute, private structureService: StructureDefinitionService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      this.baseResource = JSON.stringify(value);
      this.structure = value;
    });
  }

  computeLevel(path: string): number {
    if (path == null) {
      return 0;
    }
    const match = path.match(/\./g);
    return (match || []).length;
  }

  computeName(path: string): string {
    if (!isDefined(path) || path === null) {
      return;
    }
    if (!path.match(/\./g)) {
      return path;
    }

    const finalDotPosition = path.lastIndexOf('.');
    return path.substring(finalDotPosition + 1, path.length);
  }
}
