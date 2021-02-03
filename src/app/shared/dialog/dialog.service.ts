import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openNearbyClinics(addressId: string, favoriteClinics: any[]): MatDialogRef<NearbyClinicsComponent> {
    return this.dialog.open(NearbyClinicsComponent, { data: { addressId, favoriteClinics }, autoFocus: false });
  }

  openForgotPassword(): MatDialogRef<ForgotPasswordComponent> {
    return this.dialog.open(ForgotPasswordComponent, { autoFocus: false, disableClose: true });
  }
}
