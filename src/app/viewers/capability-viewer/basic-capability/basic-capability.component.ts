import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CapabilityService} from '../../../services/capability.service';
import {Capability} from '../../../core/model/capability';
import {Operation} from '../../../core/model/operation';
import {switchMap} from 'rxjs/operators';
import {ConfigurationService} from '../../../services/infrastructure/configuration.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-basic-capability',
  templateUrl: './basic-capability.component.html',
  styleUrls: ['./basic-capability.component.css']
})
export class BasicCapabilityComponent implements OnInit, OnChanges {
  capability: Capability = new Capability();
  private $resource: Observable<Capability>;

  // @Input()
  resourceName: string;

  // private $resource: Observable<Capability>;

  constructor(private route: ActivatedRoute,
              private capabilityService: CapabilityService,
              private configurationService: ConfigurationService) {
  }

  ngOnInit() {
    this.calculateCapabilities();
    this.configurationService.serverChanged.subscribe(() => {
      this.calculateCapabilities();
    });
  }

  private calculateCapabilities() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.resourceName = params.get('resource');
        return this.capabilityService.getCapability(this.resourceName);
      }));
    this.$resource.subscribe(value => {
      this.capability = new Capability();
      const rest = value.rest[0];
      for (let i = 0; i < rest.resource.length; i++) {
        const res = rest.resource[i];
        const resourceName = res.profile.reference.split('/')[1];
        if (resourceName === this.resourceName) {
          this.capability.type = this.resourceName;
          this.capability.profile = res.profile.reference;
          for (let j = 0; j < res.interaction.length; j++) {
            const interaction = res.interaction[j];
            switch (interaction.code) {
              case 'read':
                this.capability.read = true;
                break;
              case 'vread':
                this.capability.vread = true;
                break;
              case 'update':
                this.capability.update = true;
                break;
              case 'patch':
                this.capability.patch = true;
                break;
              case 'delete':
                this.capability.delete = true;
                break;
              case 'history_instance':
                this.capability.history_instance = true;
                break;
              case 'history_type':
                this.capability.history_type = true;
                break;
              case 'create':
                this.capability.create = true;
                break;
              case 'search_type':
                this.capability.search_type = true;
                break;
            }
          }
          if (res.readHistory && res.readHistory === true) {
            this.capability.read_history = true;
          }
          if (res.updateCreate && res.updateCreate === true) {
            this.capability.update_create = true;
          }
          if (res.conditionalCreate && res.conditionalCreate === true) {
            this.capability.conditionalCreate = true;
          }
          if (res.conditionalRead) {
            this.capability.conditionalRead = res.conditionalRead;
          }
          if (res.conditionalUpdate && res.conditionalUpdate === true) {
            this.capability.conditionalUpdate = true;
          }
          if (res.conditionalDelete && res.conditionalDelete === true) {
            this.capability.conditionalDelete = true;
          }
        }
      }
      this.capability.operations = [];

      if (rest.operation) {
        for (let k = 0; k < rest.operation.length; k++) {
          const op = rest.operation[k];
          const opDef = op.definition.reference.split('/');
          const searchString = this.resourceName.substring('Columna'.length, this.resourceName.length);
          // console.log('see ' + searchString + ' Opdef: ' + opDef[1]);
          if (opDef[1].startsWith(searchString)) {
            const operation = new Operation();
            operation.name = op.name;
            operation.reference = op.definition.reference;
            operation.description = op.definition.description;
            this.capability.operations.push(operation);
          }
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateCapabilities();
  }
}