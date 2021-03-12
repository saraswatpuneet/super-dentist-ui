import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';


@NgModule({
  declarations: [EligibilityBenefitsComponent],
  imports: [
    CommonModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
