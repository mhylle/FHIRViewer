import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MenuItem} from './menu-item';
import {isDefined} from '@angular/compiler/src/util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input()
  menuItems: MenuItem[] = [];

  @Input()
  selectedMenuItem: MenuItem;

  @Output()
  selectedMenuItemChanged: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedMenuItemChanged.emit(this.selectedMenuItem);
    for (let i = 0; i < this.menuItems.length; i++) {
      const menuItem = this.menuItems[i];
      if (isDefined(this.selectedMenuItem)) {
        console.log('Selected Menu Item was defined (' + this.selectedMenuItem.name);
        if (menuItem.name === this.selectedMenuItem.name) {
          console.log('match with my name');
          menuItem.selected = true;
        } else {
          menuItem.selected = false;
        }
      } else {
        menuItem.selected = false;
      }

    }
  }
}
