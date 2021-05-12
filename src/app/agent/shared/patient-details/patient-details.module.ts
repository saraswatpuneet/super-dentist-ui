import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PatientDetails2Component } from './patient-details.component';

@NgModule({
  declarations: [PatientDetails2Component],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
  ],
  exports: [PatientDetails2Component]
})
export class PatientDetailsModule { }
