import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ContextService} from '../../services/infrastructure/context.service';
import {User} from '../login/user';

export const slideInLeft =
  trigger('slideInLeft', [
      state('in', style({transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({
          transform: 'translate(-100%, 0)'
        }),
        animate('.15s ease-in')
      ]),
      transition('* => void', [
        animate('.15s  ease-out', style({
          transform: 'translate(0, 0)'
        }))
      ])
    ]
  );
export const slideInRight =
  trigger('slideInRight', [
      state('in', style({transform: 'translate(0, 0)'})),
      transition('void => *', [
        style({
          transform: 'translate(100%, 0)'
        }),
        animate('.15s ease-in')
      ]),
      transition('* => void', [
        animate('.15s  ease-out', style({
          transform: 'translate(0, 0)'
        }))
      ])
    ]
  );

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [slideInLeft, slideInRight]
})
export class MenuComponent implements OnInit {
  selectedResource: string;
  prevSelection = '';
  selection: string;
  selectedServer: string;
  menuEnabled = false;
  availableServers: string[];
  selectedUser: User;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private configurationService: ConfigurationService,
              private contextService: ContextService) {
    this.availableServers = ConfigurationService.availableServers;
    this.configurationService.serverChanged.subscribe((value => this.menuEnabled = value));
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // this will not work unless the context url is also the root url. Fix later.
        const url = event.url;
        const baseUrlName = url.split('/');
        if (baseUrlName[1] != null && baseUrlName[1] !== '') {
          this.selectMenu(baseUrlName[1], '');
        }
      }
    });
    this.verifyMenuEnabled();

    this.contextService.resourceChanged.subscribe(value => {
      this.selectedResource = value;
    });
    this.contextService.userChanged.subscribe(value => {
      this.selectedUser = value;
    });
  }

  private verifyMenuEnabled() {
    this.menuEnabled = (this.configurationService.selectedServer != null && this.configurationService.selectedServer !== '');
    if (this.menuEnabled) {
      this.selectedServer = this.configurationService.selectedServer;
    }
  }

  selectMenu(name: string, server: string) {
    this.prevSelection = this.selection;
    this.selection = name;
    this.selectedServer = server;
    if (server) {
      this.configurationService.changeServer(server);
    }
  }
}
