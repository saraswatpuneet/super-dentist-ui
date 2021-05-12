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

import { CodesComponent } from './shared/codes/codes.component';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { HistoryComponent } from './shared/history/history.component';
import { InsuranceRegistrationModule } from '../shared/insurance-registration/insurance-registration.module';
import { PatientDetailsComponent } from './shared/patient-details/patient-details.component';
import { PatientListItemModule } from '../shared/patient-list-item/patient-list-item.module';
import { PatientStatusPillModule } from '../shared/patient-status-pill/patient-status-pill.module';
import { RemarksComponent } from './shared/remarks/remarks.component';
import { ClinicMenuComponent } from './shared/clinic-menu/clinic-menu.component';

@NgModule({
  declarations: [
    EligibilityBenefitsComponent,
    CodesComponent,
    HistoryComponent,
    RemarksComponent,
    PatientDetailsComponent,
    ClinicMenuComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    InsuranceRegistrationModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    MatSelectModule,
    PatientListItemModule,
    PatientStatusPillModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
