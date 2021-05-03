import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalInsuranceRoutingModule } from './dental-insurance-routing.module';
import { DentalInsuranceComponent } from './dental-insurance.component';


@NgModule({
  declarations: [
    DentalInsuranceComponent
  ],
  imports: [
    CommonModule,
    DentalInsuranceRoutingModule
  ]
})
export class DentalInsuranceModule { }
