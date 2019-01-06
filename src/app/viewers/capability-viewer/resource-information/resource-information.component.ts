import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {StructureDefinitionService} from '../../../services/model/structure-definition.service';

@Component({
  selector: 'app-resource-information',
  templateUrl: './resource-information.component.html',
  styleUrls: ['./resource-information.component.css']
})
export class ResourceInformationComponent implements OnInit {

  @Input()
  resource: string;
  structure: any;

  private $resource: Observable<any>;

  constructor(private route: ActivatedRoute, private structureService: StructureDefinitionService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      if (value.resource) {
        this.structure = value.resource;
      }
    });
  }

}
