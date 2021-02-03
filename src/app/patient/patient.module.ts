import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';

@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
