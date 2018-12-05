import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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

  constructor() {
  }

  ngOnInit() {
  }

  selectMenu(name: string) {
    this.prevSelection = this.selection;
    this.selection = name;
  }

}
