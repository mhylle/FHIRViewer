import {Component, OnInit} from '@angular/core';
import {ServerInformationService} from '../services/server-information.service';
import {ConfigurationService} from '../services/infrastructure/configuration.service';
import {ResourceService} from '../services/model/resource.service';
import {ContextService} from '../services/infrastructure/context.service';
import {BundleStoreActions, BundleStoreSelectors, RootStoreState} from "../root-store";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hideReadonly = true;
  hideUnused = true;
  serverDescription: string;
  resourceTypes = [];

  layoutMode: string;
  layoutMode_item: string;
  layoutMode_header: string;
  layoutMode_actions: string;
  selectedServer: string;

  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  private bundle$: Observable<fhir.Bundle>;

  constructor(private configurationService: ConfigurationService,
              private serverInformationService: ServerInformationService,
              private resourceService: ResourceService,
              private store$: Store<RootStoreState.State>,
              private contextService: ContextService) {
  }

  ngOnInit() {
    this.layoutMode = 'table';
    this.layoutMode_item = 'table_row userList';
    this.configurationService.serverChanged.subscribe(() => this.retrieveServerInformation());
    this.retrieveServerInformation();
    console.log('test3');
    this.bundle$ = this.store$.select(BundleStoreSelectors.selectBundle);
    this.error$ = this.store$.select(BundleStoreSelectors.selectBundleError);
    this.isLoading$ = this.store$.select(BundleStoreSelectors.selectBundleIsLoading);
    this.store$.dispatch(new BundleStoreActions.LoadRequestAction());
    this.bundle$.subscribe(value => {
      for (let i = 0; i < value.entry.length; i++) {
        const entryElement = value.entry[i];
        if (entryElement.id.startsWith('Columna')) {
          this.resourceTypes.push({
            'name': entryElement.id,
            'label': entryElement.resource.id,
            'short': ''
          });
        }
      }
      this.resourceTypes.sort((a, b) => a.name.localeCompare(b.name));
    });
    // this.store$.select(BundleStoreSelectors.selectBundle).subscribe(value => {
    //   console.log('test3');
    //   for (let i = 0; i < value.entry.length; i++) {
    //     const entryElement = value.entry[i];
    //     if (entryElement.id.startsWith('Columna')) {
    //       this.resourceTypes.push({
    //         'name': entryElement.id,
    //         'label': entryElement.resource.id,
    //         'short': ''
    //       });
    //     }
    //   }
    //   this.resourceTypes.sort((a, b) => a.name.localeCompare(b.name));
    // });
    // this.resourceService.bundle.subscribe(value => {
    //   for (let i = 0; i < value.entry.length; i++) {
    //     const entryElement = value.entry[i];
    //     if (entryElement.resource.id.startsWith('Columna')) {
    //       this.resourceTypes.push({
    //         'name': entryElement.resource.id,
    //         'label': entryElement.resource,
    //         'short': entryElement.resource
    //       });
    //     }
    //   }
    //   this.resourceTypes.sort((a, b) => a.name.localeCompare(b.name));
    // });
  }

  setLayout(layout: string) {
    this.layoutMode = layout;
    if (layout === 'grid') {
      this.layoutMode_item = 'card';
      this.layoutMode_header = 'cardHeader';
      this.layoutMode_actions = 'cardActions';
    }
    if (layout === 'table') {
      this.layoutMode_item = 'table_row userList';
      this.layoutMode_header = '';
      this.layoutMode_actions = '';
    }
  }

  setContext(resourceName: string) {
    this.contextService.currentResource = resourceName;
  }

  private retrieveServerInformation() {
    this.selectedServer = this.configurationService.selectedServer;
    this.serverInformationService.getServerDescription().subscribe(value => {
      if (value != null) {
        this.serverDescription = value.description;
      } else {
        this.serverDescription = 'No description returned from the server';
      }
    });
  }
}
