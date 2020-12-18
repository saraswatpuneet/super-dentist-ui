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
  trigger('coin', [
    transition(':enter', [
      style({ transform: 'translate(-50%, -50%) rotateY(90deg)' }),
      animate('150ms 150ms ease', style({ transform: 'translate(-50%, -50%) rotateY(0deg)' }))
    ]),
    transition(':leave', [
      style({ transform: 'translate(-50%, -50%) rotateY(0deg)' }),
      animate('150ms ease', style({ transform: 'translate(-50%, -50%) rotateY(90deg)' }))
    ]),
  ])
];
