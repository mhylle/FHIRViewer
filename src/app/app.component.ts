import {Component} from '@angular/core';
import {MenuItem} from './core/menu/menu-item';
import {AuthService} from './core/auth/auth.service';
import {Router} from '@angular/router';
import {User} from './core/login/user';
import {environment} from '../environments/environment';
import {ConfigurationService} from './services/infrastructure/configuration.service';
import {isDefined} from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuItems: MenuItem[] = [];
  currentUser: User;
  loggedIn: boolean;

  constructor(private router: Router, private configurationService: ConfigurationService, private authenticationService: AuthService) {
    this.authenticationService.loginChanged.subscribe(value => {
      console.log(value);
      this.loggedIn = value;
    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const homeMenu = new MenuItem();
    homeMenu.name = 'HOME';
    homeMenu.icon = 'home';
    homeMenu.selected = false;
    homeMenu.link = 'Home';
    homeMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };
    homeMenu.position = 'left';
    this.menuItems.push(homeMenu);

    const structureMenu = new MenuItem();
    structureMenu.name = 'STRUCTURE';
    structureMenu.icon = 'address-card';
    structureMenu.link = 'StructureDefinition';
    structureMenu.position = 'left';
    structureMenu.selected = false;
    structureMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };
    this.menuItems.push(structureMenu);

    // const structureDefinitionMenu = new MenuItem();
    // structureDefinitionMenu.name = 'StructureDefinition';
    // structureDefinitionMenu.icon = 'address-card';
    // structureDefinitionMenu.link = 'RealStructureDefinition';
    // this.menuItems.push(structureDefinitionMenu);

    const capabilityMenu = new MenuItem();
    capabilityMenu.name = 'CAPABILITIES';
    capabilityMenu.icon = 'book';
    capabilityMenu.link = 'CapabilityStatement';
    capabilityMenu.position = 'left';
    capabilityMenu.selected = false;
    capabilityMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };
    this.menuItems.push(capabilityMenu);

    const serverMenu = new MenuItem();
    serverMenu.name = this.configurationService.selectedServer != null ? this.configurationService.selectedServer : 'Server';
    serverMenu.icon = 'server';
    serverMenu.link = '';
    serverMenu.selected = false;
    serverMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };
    serverMenu.menuItems = [];

    for (let i = 0; i < environment.resourceServers.length; i++) {
      const server = environment.resourceServers[i];
      const subMenu = new MenuItem();
      subMenu.name = server;
      subMenu.icon = 'server';
      subMenu.action = () => {
        this.selectServer(serverMenu, subMenu, server);
      };
      serverMenu.menuItems.push(subMenu);
    }
    serverMenu.position = 'right';
    this.menuItems.push(serverMenu);

    const loginMenu = new MenuItem();
    loginMenu.name = 'LOGIN';
    loginMenu.icon = 'sign-in';
    loginMenu.visible = !this.loggedIn;
    loginMenu.position = 'right';
    loginMenu.selected = false;
    loginMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };


    const logoutMenu = new MenuItem();
    logoutMenu.name = 'LOGOUT';
    logoutMenu.icon = 'sign-out';
    logoutMenu.position = 'right';
    logoutMenu.selected = false;
    logoutMenu.visible = this.loggedIn;
    logoutMenu.enabled = () => {
      return isDefined(this.configurationService.selectedServer);
    };
    loginMenu.action = () => {
      this.login(loginMenu, logoutMenu);
    };

    logoutMenu.action = () => {
      this.logout(logoutMenu, loginMenu);
    };

    this.menuItems.push(loginMenu);
    this.menuItems.push(logoutMenu);
  }

  selectServer(serverMenu: MenuItem, subMenu: MenuItem, server: string) {
    for (let i = 0; i < serverMenu.menuItems.length; i++) {
      serverMenu.menuItems[i].selected = false;
    }
    subMenu.selected = true;
    this.configurationService.changeServer(server);
  }

  login(loginMenu: MenuItem, logoutMenu: MenuItem) {
    loginMenu.visible = false;
    logoutMenu.visible = true;
    this.router.navigate(['/login']);
  }

  logout(logoutMenu: MenuItem, loginMenu: MenuItem) {
    loginMenu.visible = true;
    logoutMenu.visible = false;
    // logoutMenu.visible = false;
    console.log('logout called in app');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
