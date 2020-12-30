import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NearbyClinicsComponent } from './nearby-clinics/nearby-clinics.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openNearbyClinics(addressId: string, favoriteClinics: any[]): MatDialogRef<NearbyClinicsComponent> {
    return this.dialog.open(NearbyClinicsComponent, { data: { addressId, favoriteClinics }, autoFocus: false });
  }
}
