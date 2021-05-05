import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';

import { AgentInputComponent } from './agent-input.component';
import { CodeCategoryComponent } from '../code-category/code-category.component';
import { PatientStatusPillModule } from 'src/app/shared/patient-status-pill/patient-status-pill.module';
import { ToothHistoryComponent } from '../tooth-history/tooth-history.component';
import { CodeInputsModule } from '../code-inputs/code-inputs.module';
import { PatientDetailsModule } from '../patient-details/patient-details.module';

@NgModule({
  declarations: [AgentInputComponent, CodeCategoryComponent, ToothHistoryComponent],
  imports: [
    FormsModule,
    MatButtonModule,
    PatientStatusPillModule,
    FlexLayoutModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    PatientDetailsModule,
    CodeInputsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatTabsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [AgentInputComponent]
})
export class AgentInputModule { }
