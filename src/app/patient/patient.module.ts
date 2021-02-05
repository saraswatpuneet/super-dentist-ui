import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';

@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskModule,
    MatButtonModule,
    MatCardModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
