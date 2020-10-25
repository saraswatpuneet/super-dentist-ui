import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateReferralComponent } from './create-referral/create-referral.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openSignUp(): MatDialogRef<SignUpComponent> {
    return this.dialog.open(SignUpComponent);
  }

  openCreateReferral(): MatDialogRef<CreateReferralComponent> {
    return this.dialog.open(CreateReferralComponent);
  }
}
