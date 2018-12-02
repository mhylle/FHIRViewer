import {Component} from '@angular/core';
import {MenuItem} from './core/menu/menu-item';
import {AuthService} from './core/auth/auth.service';
import {Router} from '@angular/router';
import {User} from './core/login/user';
import {environment} from '../environments/environment';
import {ConfigurationService} from './services/infrastructure/configuration.service';

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
    homeMenu.name = 'Home';
    homeMenu.icon = 'home';
    homeMenu.link = 'Home';
    homeMenu.position = 'left';
    this.menuItems.push(homeMenu);

    const structureMenu = new MenuItem();
    structureMenu.name = 'Structure';
    structureMenu.icon = 'address-card';
    structureMenu.link = 'StructureDefinition';
    structureMenu.position = 'left';
    this.menuItems.push(structureMenu);

    // const structureDefinitionMenu = new MenuItem();
    // structureDefinitionMenu.name = 'StructureDefinition';
    // structureDefinitionMenu.icon = 'address-card';
    // structureDefinitionMenu.link = 'RealStructureDefinition';
    // this.menuItems.push(structureDefinitionMenu);

    const capabilityMenu = new MenuItem();
    capabilityMenu.name = 'Capabilities';
    capabilityMenu.icon = 'book';
    capabilityMenu.link = 'CapabilityStatement';
    capabilityMenu.position = 'left';
    this.menuItems.push(capabilityMenu);

    const serverMenu = new MenuItem();
    serverMenu.name = 'servers';
    serverMenu.icon = 'server';
    serverMenu.link = '';
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
    loginMenu.name = 'Login';
    loginMenu.icon = 'sign-in';
    loginMenu.link = 'login';
    loginMenu.visible = this.loggedIn;
    loginMenu.position = 'right';
    this.menuItems.push(loginMenu);

    const logoutMenu = new MenuItem();
    logoutMenu.name = 'Logout';
    logoutMenu.icon = 'sign-out';
    logoutMenu.link = 'login';
    logoutMenu.position = 'right';
    logoutMenu.action = () => {
      this.logout();
    };
    logoutMenu.visible = !this.loggedIn;
    this.menuItems.push(logoutMenu);
  }

  selectServer(serverMenu: MenuItem, subMenu: MenuItem, server: string) {
    this.configurationService.changeServer(server);
  }

  logout() {
    console.log('logout called in app');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
