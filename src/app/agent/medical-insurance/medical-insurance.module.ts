import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MedicalInsuranceRoutingModule } from './medical-insurance-routing.module';
import { MedicalInsuranceComponent } from './medical-insurance.component';
import { CodeInputsModule } from '../shared/code-inputs/code-inputs.module';

@NgModule({
  declarations: [
    MedicalInsuranceComponent
  ],
  imports: [
    CodeInputsModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MedicalInsuranceRoutingModule
  ]
})
export class MedicalInsuranceModule { }
