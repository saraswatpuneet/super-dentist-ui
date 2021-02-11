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
  trigger('fadeDown', [
    transition(':enter', [
      style({ transform: 'translateY(-8px)', opacity: 0 }),
      animate('150ms ease', style({ transform: 'translateY(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateY(0)', opacity: 1 }),
      animate('150ms ease', style({ transform: 'translateY(-8px)', opacity: 0 }))
    ]),
  ])
];
