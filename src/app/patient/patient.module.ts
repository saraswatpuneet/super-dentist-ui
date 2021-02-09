import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';

@NgModule({
  declarations: [PatientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskModule,
    MatButtonModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
