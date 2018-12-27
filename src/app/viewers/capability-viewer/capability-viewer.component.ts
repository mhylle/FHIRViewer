import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {StructureDefinitionService} from '../../services/structure-definition.service';


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


  constructor(private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.selectedResource = params.get('resource'));
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
