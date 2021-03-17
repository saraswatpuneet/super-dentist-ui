import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';

@NgModule({
  declarations: [EligibilityBenefitsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
