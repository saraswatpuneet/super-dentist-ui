import { trigger, transition, style, animate } from '@angular/animations';

export const patientAnimations = [
  trigger('spring', [
    transition(':enter', [
      style({ maxHeight: '0px' }),
      animate('1500ms', style({ maxHeight: '400px' }))
    ]),
    transition(':leave', [
      style({ maxHeight: '400px' }),
      animate('1500ms', style({ maxHeight: '0px' }))
    ]),
  ])
];
