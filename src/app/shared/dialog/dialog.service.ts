import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateReferralComponent } from './create-referral/create-referral.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openCreateReferral(specialist: any): MatDialogRef<CreateReferralComponent> {
    return this.dialog.open(CreateReferralComponent, { data: specialist });
  }
}
