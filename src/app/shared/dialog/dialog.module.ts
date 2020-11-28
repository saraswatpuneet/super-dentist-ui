import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { CreateReferralComponent } from './create-referral/create-referral.component';

@NgModule({
  declarations: [CreateReferralComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class DialogModule { }
