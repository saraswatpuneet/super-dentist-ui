import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { CreateReferralComponent } from './create-referral/create-referral.component';
import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';

@NgModule({
  declarations: [CreateReferralComponent, NearbyClinicsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class DialogModule { }
