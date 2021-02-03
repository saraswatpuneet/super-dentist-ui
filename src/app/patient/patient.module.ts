import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';

@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
