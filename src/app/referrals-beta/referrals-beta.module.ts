import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ReferralsBetaRoutingModule } from './referrals-beta-routing.module';
import { ReferralsBetaComponent } from './referrals-beta.component';
import { ReferralSummaryComponent } from './shared/referral-summary/referral-summary.component';

@NgModule({
  declarations: [ReferralsBetaComponent, ReferralSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReferralsBetaRoutingModule
  ]
})
export class ReferralsBetaModule { }
