import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { specialistReasonKeys, SpecialistType } from '../shared/services/clinic';
import { specialistAnimations } from './specialist.animations';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss'],
  animations: specialistAnimations
})
export class SpecialistComponent extends Base implements OnInit {
  @ViewChild('refEl') refEl: ElementRef;
  @ViewChild('refCardEl') refCardEl: ElementRef;
  favoriteClinics = [];
  loading = false;
  addressId = '';
  selectedSpecialty: SpecialistType;
  selectedPlaceId = '';
  showCreateReferral = false;
  selectedReferral: any;
  private triggerFavoriteRefresh = new Subject<void>();

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { super(); }

  ngOnInit(): void {
    this.loading = true;
    this.watchFavorites();

    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => {
      this.addressId = addy.addressId;
      this.triggerFavoriteRefresh.next();
    });
  }

  createReferral(a: any, el: any): void {
    this.selectedPlaceId = a.placeId;
    this.selectedSpecialty = a.specialties[0];
    this.showCreateReferral = true;
    this.selectedReferral = a;
    this.refEl.nativeElement.style.height = '100%';
    const referralBounds = el.parentElement.getBoundingClientRect();
    this.refCardEl.nativeElement.parentElement.style.transition = 0;
    this.refCardEl.nativeElement.parentElement.style.top = `${referralBounds.y - 58}px`;
    setTimeout(() => this.refCardEl.nativeElement.parentElement.style.transition = '0.3s', 100);

    setTimeout(() => {
      this.refEl.nativeElement.style.transition = '0.3s';
      this.refCardEl.nativeElement.parentElement.style.top = '20px';
    }, 200);
  }

  cancel(): void {
    this.selectedPlaceId = undefined;
    this.selectedSpecialty = undefined;
    this.showCreateReferral = false;
    this.refEl.nativeElement.style.height = 0;
    this.refCardEl.nativeElement.parentElement.style.transition = '0s';
    setTimeout(() => {
      this.selectedReferral = undefined;
      this.refEl.nativeElement.style.transition = '0s';
    }, 300);
  }

  editFavorites(): void {
    this.dialogService.openNearbyClinics(this.addressId, this.favoriteClinics).afterClosed().pipe(take(1)).subscribe(res => {
      if (!!res) {
        this.favoriteClinics = res;
      }
    });
  }

  private watchFavorites(): void {
    this.triggerFavoriteRefresh.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.getFavoriteClinics(this.addressId)),
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
      placeId: verifiedDetails.PlaceID,
      address: verifiedDetails.address,
      rating: generalDetails.rating,
      ratingCount: generalDetails.user_ratings_total,
      verified: true,
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
      ratingCount: generalDetails.user_ratings_total,
      verified: false
    };
  }
}
