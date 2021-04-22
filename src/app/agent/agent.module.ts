import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';

import { AgentComponent } from './agent.component';
import { AgentInputComponent } from './shared/agent-input/agent-input.component';
import { AgentRoutingModule } from './agent-routing.module';
import { CodeInputsComponent } from './shared/code-inputs/code-inputs.component';
import { PatientDetails2Component } from './shared/patient-details/patient-details.component';
import { ToothHistoryComponent } from './shared/tooth-history/tooth-history.component';
import { PatientListItemModule } from '../shared/patient-list-item/patient-list-item.module';
import { CodeCategoryComponent } from './shared/code-category/code-category.component';
import { PatientStatusPillModule } from '../shared/patient-status-pill/patient-status-pill.module';

@NgModule({
  declarations: [
    AgentComponent,
    PatientDetails2Component,
    AgentInputComponent,
    CodeInputsComponent,
    ToothHistoryComponent,
    CodeCategoryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTabsModule,
    NgxMaskModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressBarModule,
    PatientStatusPillModule,
    PatientListItemModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    AgentRoutingModule
  ]
})
export class AgentModule { }
