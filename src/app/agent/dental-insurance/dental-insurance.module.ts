import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentalInsuranceRoutingModule } from './dental-insurance-routing.module';
import { DentalInsuranceComponent } from './dental-insurance.component';
import { AgentInputModule } from '../shared/agent-input/agent-input.module';


@NgModule({
  declarations: [
    DentalInsuranceComponent
  ],
  imports: [
    CommonModule,
    AgentInputModule,
    DentalInsuranceRoutingModule
  ]
})
export class DentalInsuranceModule { }
