import {Component, Input, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {StructureDefinitionService} from '../../../services/model/structure-definition.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-resource-information',
  templateUrl: './resource-information.component.html',
  styleUrls: ['./resource-information.component.css'],
  animations: [
    trigger(
      'slideIn', [
        state('*', style({'overflow-y': 'hidden'})),
        state('void', style({'overflow-y': 'hidden'})),
        transition('* => void', [
          style({height: '*'}),
          animate(200, style({height: 0}))
        ]),
        transition('void => *', [
          style({height: '0'}),
          animate(200, style({height: '*'}))
        ])
      ]
    )
  ]
})
export class ResourceInformationComponent implements OnInit {

  @Input()
  resource: string;

  @Input()
  implementationDetails: string;
  structure: any;

  private $resource: Observable<any>;
  showImplementationDetails: boolean;

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

  toggleImplementationDetails() {
    this.showImplementationDetails = !this.showImplementationDetails;
  }
}
