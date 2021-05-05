import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';

import { MedicalInsuranceRoutingModule } from './medical-insurance-routing.module';
import { MedicalInsuranceComponent } from './medical-insurance.component';
import { CodeInputsModule } from '../shared/code-inputs/code-inputs.module';
import { PatientDetailsModule } from '../shared/patient-details/patient-details.module';

@NgModule({
  declarations: [
    MedicalInsuranceComponent
  ],
  imports: [
    CodeInputsModule,
    CommonModule,
    FlexLayoutModule,
    PatientDetailsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    NgxMaskModule,
    MatIconModule,
    ReactiveFormsModule,
    MedicalInsuranceRoutingModule
  ]
})
export class MedicalInsuranceModule { }
