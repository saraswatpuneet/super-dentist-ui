import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { IsClinicGuard } from '../isClinic.guard';

const routes: Routes = [
  { path: '', component: EligibilityBenefitsComponent, canActivate: [IsClinicGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityBenefitsRoutingModule { }
