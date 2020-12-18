import { trigger, transition, style, animate } from '@angular/animations';

export const referralsBetaAnimations = [
  trigger('slideInOut', [
    transition(':enter', [
      style({ width: 0, opacity: 0 }),
      animate('250ms', style({ width: '350px', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ width: '350px', opacity: 1 }),
      animate('250ms', style({ width: 0, opacity: 0 }))
    ]),
  ])
];
