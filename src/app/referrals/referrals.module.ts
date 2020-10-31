import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralsRoutingModule } from './referrals-routing.module';
import { ReferralsComponent } from './referrals.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    ReferralsRoutingModule
  ]
})
export class ReferralsModule { }
