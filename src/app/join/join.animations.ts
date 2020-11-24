import { trigger, transition, style, animate, state } from '@angular/animations';

export const joinAnimations = [
  trigger('sidebarToggle', [
    state('*', style({
      opacity: 1
    })),
    state('void', style({
      opacity: 0
    })),
    transition('* <=> void', animate('100ms ease-in'))
  ]),
  trigger('fadeInOut', [
    state('*', style({
      opacity: 1
    })),
    state('void', style({
      opacity: 0
    })),
    transition('* <=> void', animate('200ms ease-in'))
  ]),
];
