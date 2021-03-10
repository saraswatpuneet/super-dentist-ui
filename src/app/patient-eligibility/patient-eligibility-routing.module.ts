import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientEligibilityComponent } from './patient-eligibility.component';

const routes: Routes = [
  { path: '', component: PatientEligibilityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientEligibilityRoutingModule { }
