import { trigger, transition, style, animate } from '@angular/animations';

export const referralsAnimations = [
  trigger('slideInOut', [
    transition(':enter', [
      style({ width: 0, opacity: 0 }),
      animate('250ms', style({ width: '375px', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ width: '375px', opacity: 1 }),
      animate('250ms', style({ width: 0, opacity: 0 }))
    ]),
  ]),
  trigger('accordion', [
    transition(':enter', [
      style({ height: 0 }),
      animate('250ms', style({ width: '375px', opacity: 1 }))
    ]),
    transition(':leave', [
      style({ height: 'auto' }),
      animate('250ms', style({ width: 0, opacity: 0 }))
    ]),
  ])
];
