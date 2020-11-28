import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReferralsRoutingModule } from './referrals-routing.module';
import { ReferralsComponent } from './referrals.component';

@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReferralsRoutingModule
  ]
})
export class ReferralsModule { }
