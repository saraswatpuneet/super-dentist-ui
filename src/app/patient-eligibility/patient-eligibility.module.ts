import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientEligibilityRoutingModule } from './patient-eligibility-routing.module';
import { PatientEligibilityComponent } from './patient-eligibility.component';


@NgModule({
  declarations: [PatientEligibilityComponent],
  imports: [
    CommonModule,
    PatientEligibilityRoutingModule
  ]
})
export class PatientEligibilityModule { }
