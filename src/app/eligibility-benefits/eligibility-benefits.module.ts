import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { InsuranceRegistrationModule } from '../shared/insurance-registration/insurance-registration.module';
import { CodesComponent } from './shared/codes/codes.component';

@NgModule({
  declarations: [EligibilityBenefitsComponent, CodesComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    InsuranceRegistrationModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
