import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateReferralComponent } from './create-referral/create-referral.component';
import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';
import { SpecialistType } from '../services/clinic';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openCreateReferral(placeId: string, specialty?: string): MatDialogRef<CreateReferralComponent> {
    return this.dialog.open(CreateReferralComponent, { data: { placeId, specialty }, autoFocus: false });
  }

  openNearbyClinics(addressId: string, favoriteClinics: any[]): MatDialogRef<NearbyClinicsComponent> {
    return this.dialog.open(NearbyClinicsComponent, { data: { addressId, favoriteClinics }, autoFocus: false });
  }
}
