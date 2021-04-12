import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientStatusPillComponent } from './patient-status-pill.component';



@NgModule({
  declarations: [
    PatientStatusPillComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PatientStatusPillComponent
  ]
})
export class PatientStatusPillModule { }
