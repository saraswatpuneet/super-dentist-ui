import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientStatusPillModule } from 'src/app/shared/patient-status-pill/patient-status-pill.module';
import { AgentMenuComponent } from './agent-menu/agent-menu.component';
import { InsuranceFilterComponent } from './insurance-filter/insurance-filter.component';

@NgModule({
  declarations: [
    PatientsComponent,
    AgentMenuComponent,
    InsuranceFilterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    PatientStatusPillModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
