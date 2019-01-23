import {Component, OnInit} from '@angular/core';
import {ServerInformationService} from '../services/server-information.service';
import {ConfigurationService} from '../services/infrastructure/configuration.service';
import {ContextService} from '../services/infrastructure/context.service';
import {AppState} from '../store/reducers';
import {select, Store} from '@ngrx/store';
import {BundleRequested} from '../store/bundle/bundle.actions';
import {selectColumnaBundles} from '../store/bundle/bundle.selectors';
import {Observable} from 'rxjs';
import BundleEntry = fhir.BundleEntry;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  serverDescription: string;

  layoutMode: string;
  layoutMode_item: string;
  layoutMode_header: string;
  layoutMode_actions: string;
  selectedServer: string;
  private bundle$: Observable<BundleEntry[]>;

  constructor(private configurationService: ConfigurationService,
              private serverInformationService: ServerInformationService,
              private contextService: ContextService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.layoutMode = 'table';
    this.layoutMode_item = 'table_row userList';
    this.configurationService.serverChanged.subscribe(() => this.retrieveServerInformation());
    this.retrieveServerInformation();
    this.store.dispatch(new BundleRequested());

    this.bundle$ = this.store.pipe(select(selectColumnaBundles));
  }

  setLayout(layout: string) {
    this.layoutMode = layout;
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
