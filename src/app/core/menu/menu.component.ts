import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ConfigurationService} from '../../services/infrastructure/configuration.service';
import {isDefined} from '@angular/compiler/src/util';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ContextService} from "../../services/infrastructure/context.service";
import {User} from "../login/user";

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
  private $selectedResource: Observable<string>;

  constructor(private route: ActivatedRoute, private configurationService: ConfigurationService, private contextService: ContextService) {
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
    if (this.route.snapshot.paramMap.get('resource') != null) {
      this.$selectedResource.subscribe(value => {
        console.log(value);
        this.selectedResource = value;
      });
    }
    this.$selectedResource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('route pipe');
        return params.get('resource');
      }));
    this.$selectedResource.subscribe(value => {
      console.log(value);
      this.selectedResource = value
    });
    this.contextService.resourceChanged.subscribe(value => {
      console.log('selectedResource: ' + value);
      this.selectedResource = value
    });
    this.contextService.userChanged.subscribe(value => {
      console.log('selectedUser: ' + value);
      this.selectedUser = value
    });
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
