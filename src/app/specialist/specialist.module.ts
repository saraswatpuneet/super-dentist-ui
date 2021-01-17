import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskModule } from 'ngx-mask';

import { LoaderModule } from '../shared/loader/loader.module';
import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistComponent } from './specialist.component';
import { CreateReferralComponent } from './shared/create-referral/create-referral.component';
import { CreateTreatmentSummaryComponent } from './shared/create-treatment-summary/create-treatment-summary.component';

@NgModule({
  declarations: [CreateReferralComponent, SpecialistComponent, CreateTreatmentSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxMaskModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    LoaderModule,
    SpecialistRoutingModule
  ]
})
export class SpecialistModule { }
