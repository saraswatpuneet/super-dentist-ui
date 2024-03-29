import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InsuranceRegistrationModule } from '../insurance-registration/insurance-registration.module';

@NgModule({
  declarations: [NearbyClinicsComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    InsuranceRegistrationModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FlexLayoutModule,
  ]
})
export class DialogModule { }
