import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { MatButtonModule } from '@angular/material/button';
import { InsuranceRegistrationModule } from '../shared/insurance-registration/insurance-registration.module';

@NgModule({
  declarations: [EligibilityBenefitsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    InsuranceRegistrationModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
