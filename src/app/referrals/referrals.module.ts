import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralsRoutingModule } from './referrals-routing.module';
import { ReferralsComponent } from './referrals.component';


@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    ReferralsRoutingModule
  ]
})
export class ReferralsModule { }
