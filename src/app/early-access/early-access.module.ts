import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarlyAccessRoutingModule } from './early-access-routing.module';
import { EarlyAccessComponent } from './early-access.component';


@NgModule({
  declarations: [EarlyAccessComponent],
  imports: [
    CommonModule,
    EarlyAccessRoutingModule
  ]
})
export class EarlyAccessModule { }
