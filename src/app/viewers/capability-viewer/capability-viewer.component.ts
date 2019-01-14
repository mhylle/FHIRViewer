import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {StructureDefinitionService} from '../../services/model/structure-definition.service';
import {ContextService} from '../../services/infrastructure/context.service';
import {CapabilityService} from '../../services/model/capability.service';


@Component({
  selector: 'app-capability-viewer',
  templateUrl: './capability-viewer.component.html',
  styleUrls: ['./capability-viewer.component.css']
})
export class CapabilityViewerComponent implements OnInit {
  selectedResource: string;
  hideReadonly = true;
  hideUnused = true;
  structure: any;
  private capabilityStatement: fhir.CapabilityStatement;

  constructor(private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService,
              private capabilityService: CapabilityService,
              private contextService: ContextService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedResource = params.get('resource');
      this.capabilityStatement = null;
      this.contextService.currentResource = this.selectedResource;
      this.capabilityService.getCapabilityStatement(this.selectedResource).subscribe(value => {
        this.capabilityStatement = value;
      });

    });
    this.configurationService.serverChanged.subscribe(() => this.updateDescription());

  }

  updateDescription() {
    if (this.selectedResource != null) {
      this.structureService.getStructure(this.selectedResource).subscribe(structure => {
        if (structure.resource) {
          this.structure = structure.resource;
        }
      });
    }
  }

  updateReadOnly(hideReadOnly: boolean) {
    this.hideReadonly = hideReadOnly;
  }

  updateUnused(hideUnused: boolean) {
    this.hideUnused = hideUnused;
  }
}
