import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PracticesComponent } from './shared/practices/practices.component';
import { AccountComponent } from './shared/account/account.component';
import { VisibleInsuranceFieldsModule } from './shared/visible-insurance-fields/visible-insurance-fields.module';
import { AgentInputComponent } from './shared/agent-input/agent-input.component';
import { ToothHistoryComponent } from './shared/tooth-history/tooth-history.component';

@NgModule({
  declarations: [SettingsComponent, PracticesComponent, AccountComponent, AgentInputComponent, ToothHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    ReactiveFormsModule,
    VisibleInsuranceFieldsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
