import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateReferralComponent } from './create-referral/create-referral.component';

@NgModule({
  declarations: [SignUpComponent, CreateReferralComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
  ]
})
export class DialogModule { }
