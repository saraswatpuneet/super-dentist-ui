import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalInsuranceRoutingModule } from './medical-insurance-routing.module';
import { MedicalInsuranceComponent } from './medical-insurance.component';


@NgModule({
  declarations: [
    MedicalInsuranceComponent
  ],
  imports: [
    CommonModule,
    MedicalInsuranceRoutingModule
  ]
})
export class MedicalInsuranceModule { }
