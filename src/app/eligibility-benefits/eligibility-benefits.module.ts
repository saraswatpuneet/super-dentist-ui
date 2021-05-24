import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';

import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { InsuranceRegistrationModule } from '../shared/insurance-registration/insurance-registration.module';
import { PatientListItemModule } from '../shared/patient-list-item/patient-list-item.module';
import { PatientStatusPillModule } from '../shared/patient-status-pill/patient-status-pill.module';
import { ClinicMenuComponent } from './shared/clinic-menu/clinic-menu.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    EligibilityBenefitsComponent,
    ClinicMenuComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    InsuranceRegistrationModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    PatientListItemModule,
    PatientStatusPillModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
