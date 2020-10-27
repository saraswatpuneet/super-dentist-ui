import { trigger, transition, style, animate, state } from '@angular/animations';

export const appAnimations = [
  trigger('sidebarToggle', [
    state('*', style({
      opacity: 1
    })),
    state('void', style({
      opacity: 0
    })),
    transition('* <=> void', animate('100ms ease-in'))
  ]),
];
