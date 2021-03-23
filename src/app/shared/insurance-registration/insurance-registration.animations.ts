import { trigger, transition, style, animate } from '@angular/animations';

export const insuranceAnimations = [
  trigger('slideIn', [
    transition(':enter', [
      style({ transform: 'translateX(-40px)', opacity: 0 }),
      animate('300ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ transform: 'translateX(0px)', opacity: 1 }),
      animate('300ms ease', style({ transform: 'translateX(40px)', opacity: 0 }))
    ]),
  ])
];
