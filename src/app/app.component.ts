import {Component} from '@angular/core';
import {MenuItem} from './menu/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems: MenuItem[] = [];
  title = 'FHIRDocs';


  constructor() {
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

    const capabilityMenu = new MenuItem();
    capabilityMenu .name = 'Capabilities';
    capabilityMenu .icon = 'book';
    capabilityMenu .link = 'CapabilityStatement';
    this.menuItems.push(capabilityMenu );
  }
}
