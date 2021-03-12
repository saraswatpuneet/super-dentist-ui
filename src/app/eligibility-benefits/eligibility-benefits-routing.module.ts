import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityBenefitsComponent } from './eligibility-benefits.component';

const routes: Routes = [
  { path: '', component: EligibilityBenefitsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityBenefitsRoutingModule { }
