import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeagoPipe } from './timeago.pipe';

@NgModule({
  declarations: [TimeagoPipe],
  imports: [
    CommonModule
  ],
  exports: [
    TimeagoPipe
  ]
})
export class TimeagoModule { }
