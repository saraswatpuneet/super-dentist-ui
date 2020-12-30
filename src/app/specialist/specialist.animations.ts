import { trigger, transition, style, animate, state } from '@angular/animations';

export const specialistAnimations = [
  trigger('fade', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('200ms ease', style({ opacity: 1 }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('200ms ease', style({ opacity: 0 }))
    ]),
  ])
];
