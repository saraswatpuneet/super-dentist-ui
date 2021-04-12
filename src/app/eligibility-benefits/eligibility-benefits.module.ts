import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { EligibilityBenefitsRoutingModule } from './eligibility-benefits-routing.module';
import { EligibilityBenefitsComponent } from './eligibility-benefits.component';
import { InsuranceRegistrationModule } from '../shared/insurance-registration/insurance-registration.module';
import { CodesComponent } from './shared/codes/codes.component';
import { HistoryComponent } from './shared/history/history.component';
import { RemarksComponent } from './shared/remarks/remarks.component';
import { PatientDetailsComponent } from './shared/patient-details/patient-details.component';
import { PatientListItemModule } from '../shared/patient-list-item/patient-list-item.module';
import { PatientStatusPillModule } from '../shared/patient-status-pill/patient-status-pill.module';

@NgModule({
  declarations: [
    EligibilityBenefitsComponent,
    CodesComponent,
    HistoryComponent,
    RemarksComponent,
    PatientDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientStatusPillModule,
    PatientListItemModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    InsuranceRegistrationModule,
    EligibilityBenefitsRoutingModule
  ]
})
export class EligibilityBenefitsModule { }
