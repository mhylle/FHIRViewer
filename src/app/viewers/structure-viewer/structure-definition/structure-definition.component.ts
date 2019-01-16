import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StructureDefinitionService} from '../../../services/model/structure-definition.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {ModelUtils} from '../../../core/utils/model-utils';
import {ContextService} from '../../../services/infrastructure/context.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import StructureDefinition = fhir.StructureDefinition;

@Component({
  selector: 'app-structure-definition',
  templateUrl: './structure-definition.component.html',
  styleUrls: ['./structure-definition.component.css'],
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
export class StructureDefinitionComponent implements OnInit {
  descriptionVisible: boolean;
  json: string;

  constructor(private route: ActivatedRoute,
              private breakpointObserver: BreakpointObserver,
              private structureService: StructureDefinitionService,
              private contextService: ContextService) {
    breakpointObserver.observe([
      '(min-width: 850px)'
    ]).subscribe(result => {
      this.descriptionVisible = result.matches;
    });
  }

  structureDefinition: StructureDefinition;
  @Input()
  hideUnused = true;

  @Input()
  hideReadonly = true;

  @Input()
  resource: string;

  structure: any;
  private result: string;
  baseResource: string;

  ngOnInit() {
    this.contextService.resourceChanged.subscribe(value => {
      this.resource = value;
      this.retrieveStructure();
    });
    this.retrieveStructure();
  }

  private retrieveStructure() {
    this.structureService.getStructure(this.resource).subscribe(value => {
      this.baseResource = JSON.stringify(value);
      if (value.resource) {
        this.structureDefinition = value.resource;
        this.structure = value.resource;
      }
    });
  }

  showJson() {
    this.structureService.save(this.structureDefinition).subscribe(value => this.result = value);
  }

  isReadOnly(constraint: fhir.ElementDefinitionConstraint[]) {
    return ModelUtils.isReadOnly(constraint);
  }

  setContext(resourceName: string) {
    this.contextService.currentResource = resourceName;
  }
}
