import { trigger, transition, style, animate } from '@angular/animations';

export const chatAnimations = [
  trigger('slideUpDown', [
    transition(':enter', [
      style({ maxHeight: 0, opacity: 0 }),
      animate('250ms', style({ maxHeight: '300px', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ maxHeight: '300px', opacity: 1 }),
      animate('250ms', style({ maxHeight: '0', opacity: 0 }))
    ]),
  ])
];
