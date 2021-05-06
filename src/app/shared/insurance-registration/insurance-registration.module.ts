import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InsuranceRegistrationComponent } from './insurance-registration.component';
import { DobComponent } from './shared/dob/dob.component';
import { DentalInsuranceComponent } from './shared/dental-insurance/dental-insurance.component';
import { MedicalInsuranceComponent } from './shared/medical-insurance/medical-insurance.component';
import { InsuranceSummaryComponent } from './shared/insurance-summary/insurance-summary.component';

@NgModule({
  declarations: [
    InsuranceRegistrationComponent,
    DobComponent, DentalInsuranceComponent,
    MedicalInsuranceComponent,
    InsuranceSummaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    NgxMaskModule,
    ReactiveFormsModule,
  ],
  exports: [InsuranceRegistrationComponent]
})
export class InsuranceRegistrationModule { }
