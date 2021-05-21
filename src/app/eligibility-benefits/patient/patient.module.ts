import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { RemarksComponent } from './shared/remarks/remarks.component';
import { CodesComponent } from './shared/codes/codes.component';
import { HistoryComponent } from './shared/history/history.component';
import { PatientDetailsComponent } from './shared/patient-details/patient-details.component';
import { PatientStatusPillModule } from 'src/app/shared/patient-status-pill/patient-status-pill.module';

@NgModule({
  declarations: [
    PatientComponent,
    RemarksComponent,
    CodesComponent,
    PatientDetailsComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PatientStatusPillModule,
    FlexLayoutModule,
    MatProgressBarModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
