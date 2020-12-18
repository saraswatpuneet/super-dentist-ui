import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { specialistReasonKeys } from '../shared/services/clinic';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent extends Base implements OnInit {
  favoriteClinics = [];
  loading = false;
  addId = '';
  private triggerFavoriteRefresh = new Subject<void>();

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { super(); }

  ngOnInit(): void {
    this.loading = true;
    this.watchFavorites();

    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => {
      this.addId = addy.addressId;
      this.triggerFavoriteRefresh.next();
    });
  }

  createReferral(a: any): void {
    console.log(a);
    this.dialogService.openCreateReferral(a.placeId, a.specialties[0]);
  }

  editFavorites(): void {
    this.dialogService.openNearbyClinics(this.addId, this.favoriteClinics).afterClosed().pipe(take(1)).subscribe(res => {
      if (!!res) {
        this.favoriteClinics = res;
      }
    });
  }

  private watchFavorites(): void {
    this.triggerFavoriteRefresh.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.getFavoriteClinics(this.addId)),
      map(r => r.data.clinicAddresses.map(a => {
        if (a.verifiedDetails.IsVerified) {
          return this.mapFromVerified(a.verifiedDetails, a.generalDetails);
        }

        return this.mapFromGeneralDetails(a.generalDetails);
      })),
      takeUntil(this.unsubscribe$)
    ).subscribe(favorites => {
      this.favoriteClinics = favorites;
      this.loading = false;
    });
  }

  private mapFromVerified(verifiedDetails: any, generalDetails: any): any {
    return {
      type: verifiedDetails.type,
      specialties: verifiedDetails.specialty,
      phoneNumber: verifiedDetails.phoneNumber,
      name: verifiedDetails.name,
      email: verifiedDetails.emailAddress,
      placeId: verifiedDetails.PlaceId,
      address: verifiedDetails.address,
      rating: generalDetails.rating,
      ratingCount: generalDetails.user_ratings_total
    };
  }

  private mapFromGeneralDetails(generalDetails: any): any {
    let specialty = '';

    if (generalDetails.types && generalDetails.types[0] && specialistReasonKeys[generalDetails.types[0]]) {
      specialty = generalDetails.types[0];
    }

    return {
      type: generalDetails.types ? generalDetails.types[0] : '',
      specialties: [specialty],
      phoneNumber: generalDetails.formatted_phone_number,
      name: generalDetails.name,
      email: undefined,
      placeId: generalDetails.place_id,
      address: generalDetails.formatted_address,
      rating: generalDetails.rating,
      ratingCount: generalDetails.user_ratings_total
    };
  }
}
