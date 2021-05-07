import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientStatusPillModule } from 'src/app/shared/patient-status-pill/patient-status-pill.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    PatientStatusPillModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
