import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {StructureDefinitionService} from '../../services/structure-definition.service';
import {isDefined} from '@angular/compiler/src/util';
import {ContextService} from "../../services/infrastructure/context.service";


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
  private $selectedResource: Observable<string>;

  constructor(private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private structureService: StructureDefinitionService,
              private contextService: ContextService) {
  }

  ngOnInit() {
    this.$selectedResource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return params.get('resource');
      }));
    this.configurationService.serverChanged.subscribe(() => this.updateDescription());
    this.contextService.resourceChanged.subscribe(value => this.selectedResource = value);
    // if (this.route.snapshot.paramMap.get('resource') != null) {
    //   this.$selectedResource.subscribe(value => {
    //     this.selectedResource = value;
    //   });
    // }
  }

  updateDescription() {
    if (isDefined(this.selectedResource) && this.selectedResource != null) {
      this.structureService.getStructure(this.selectedResource).subscribe(structure => {
        if (structure.resource) {
          this.structure = structure.resource;
        }
      });
    }
  }

  selectResource(resource: string) {
    this.selectedResource = resource;
  }

  updateReadOnly(hideReadOnly: boolean) {
    this.hideReadonly = hideReadOnly;
  }

  updateUnused(hideUnused: boolean) {
    this.hideUnused = hideUnused;
  }
}
