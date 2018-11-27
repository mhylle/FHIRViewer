import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CapabilityService} from '../capability.service';
import {Observable} from 'rxjs';
import {Capability} from '../../model/capability';
import {Operation} from '../../model/operation';

@Component({
  selector: 'app-basic-capability',
  templateUrl: './basic-capability.component.html',
  styleUrls: ['./basic-capability.component.css']
})
export class BasicCapabilityComponent implements OnInit {
  private $resource: Observable<Capability>;

  capability: Capability = new Capability();
  resource: string;

  constructor(private route: ActivatedRoute, private capabilityService: CapabilityService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.resource = params.get('resource');
        return this.capabilityService.getCapability(this.resource);
      }));

    this.$resource.subscribe(value => {
      // this.allCapabilities = value;
      console.log(this.resource);

      const rest = value.rest[0];
      for (let i = 0; i < rest.resource.length; i++) {
        const res = rest.resource[i];
        if (res.profile.reference.split('/')[1] === this.resource) {
          this.capability = new Capability();
          this.capability.type = this.resource;
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
          const searchString = this.resource.substring('Columna'.length, this.resource.length);
          console.log('see ' + searchString + ' OPdef: ' + opDef[1])
          if (opDef[1].startsWith(searchString)) {
            const operation = new Operation();
            operation.name = op.name;
            operation.reference = op.definition.reference;
            operation.description= op.definition.description;
            this.capability.operations.push(operation);
          }
        }
      }
    });
  }
}
