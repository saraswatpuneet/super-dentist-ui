import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateReferralComponent } from './create-referral/create-referral.component';
import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openCreateReferral(specialist: any): MatDialogRef<CreateReferralComponent> {
    return this.dialog.open(CreateReferralComponent, { data: specialist, autoFocus: false });
  }

  openNearbyClinics(addressId: string, favoriteClinics: any[]): MatDialogRef<NearbyClinicsComponent> {
    return this.dialog.open(NearbyClinicsComponent, { data: { addressId, favoriteClinics }, autoFocus: false });
  }
}
