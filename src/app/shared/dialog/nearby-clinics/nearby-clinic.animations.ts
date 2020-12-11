import { trigger, transition, style, animate, group } from '@angular/animations';

export const nearbyClinicsAnimations = [
  trigger('collapse', [
    transition(':leave', [
      group([
        animate('150ms ease-in', style({ transform: 'translateX(calc(100% + 24px))' })),
        animate('150ms 150ms ease-in', style({ height: '0px', }))
      ])
    ]),
  ]),
  trigger('collapseLeft', [
    transition(':leave', [
      group([
        animate('150ms ease-in', style({ transform: 'translateX(calc(-100% - 24px))' })),
        animate('150ms 150ms ease-in', style({ height: '0px', }))
      ])
    ]),
  ]),
];
