import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {isDefined} from '@angular/compiler/src/util';

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
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css'],
  animations: [slideInLeft, slideInRight]
})
export class Menu2Component implements OnInit {
  prevSelection = '';
  selection: string;
  selectedServer: string;
  menuEnabled = false;
  availableServers: string[];

  constructor(private configurationService: ConfigurationService) {
    this.availableServers = ConfigurationService.availableServers;
    this.configurationService.serverChanged.subscribe((value => this.menuEnabled = value));
  }

  ngOnInit() {
    this.menuEnabled = (isDefined(this.configurationService.selectedServer)
      && this.configurationService.selectedServer != null
      && this.configurationService.selectedServer !== '');
    if (this.menuEnabled) {
      this.selectedServer = this.configurationService.selectedServer;
    }
  }

  selectMenu(name: string, server: string) {
    this.prevSelection = this.selection;
    this.selection = name;
    this.selectedServer = server;
    console.log('selection: ' + this.selection);
    if (server) {
      this.configurationService.changeServer(server);
    }
  }
}
