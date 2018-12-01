import {Component} from '@angular/core';
import {MenuItem} from './core/menu/menu-item';
import {AuthService} from './core/auth/auth.service';
import {Router} from '@angular/router';
import {User} from './core/login/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuItems: MenuItem[] = [];
  currentUser: User;

  constructor(private router: Router, private authenticationService: AuthService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const homeMenu = new MenuItem();
    homeMenu.name = 'Home';
    homeMenu.icon = 'home';
    homeMenu.link = 'Home';
    this.menuItems.push(homeMenu);

    const structureMenu = new MenuItem();
    structureMenu.name = 'Structure';
    structureMenu.icon = 'address-card';
    structureMenu.link = 'StructureDefinition';
    this.menuItems.push(structureMenu);

    const structureDefinitionMenu = new MenuItem();
    structureDefinitionMenu.name = 'StructureDefinition';
    structureDefinitionMenu.icon = 'address-card';
    structureDefinitionMenu.link = 'RealStructureDefinition';
    this.menuItems.push(structureDefinitionMenu);

    const capabilityMenu = new MenuItem();
    capabilityMenu.name = 'Capabilities';
    capabilityMenu.icon = 'book';
    capabilityMenu.link = 'CapabilityStatement';
    this.menuItems.push(capabilityMenu);

    const loginMenu = new MenuItem();
    loginMenu.name = 'Login';
    loginMenu.icon = 'sign-in-alt';
    loginMenu.link = 'login';
    this.menuItems.push(loginMenu);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
