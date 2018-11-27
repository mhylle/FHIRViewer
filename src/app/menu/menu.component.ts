import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from './menu-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input()
  menuItems: MenuItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
