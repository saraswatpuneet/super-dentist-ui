import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { map, switchMap, take, takeUntil, tap, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import * as L from 'leaflet';

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
export class SpecialistComponent extends Base implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('refEl') refEl: ElementRef;
  @ViewChild('refCardEl') refCardEl: ElementRef;
  @ViewChild('refMap') refMap: ElementRef;
  clinicType = '';
  favoriteClinics = [];
  networkClinics = [];
  placeId = '';
  loading = false;
  addressId = '';
  selectedSpecialty: SpecialistType;
  selectedPlaceId = '';
  showCreateReferral = false;
  selectedReferral: any;
  map: any;
  location: any;
  private favoriteMarkers = [];
  private triggerFavoriteRefresh = new Subject<void>();
  private triggerNetworkClinics = new Subject<void>();

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { super(); }

  ngOnInit(): void {
    this.loading = true;
    this.watchFavorites();
    this.watchNetwork();

    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => {
      this.addressId = addy.addressId;
      this.location = addy.Location;
      this.clinicType = addy.type;
      setTimeout(() => this.initMap(), 150);
      this.triggerFavoriteRefresh.next();
      this.triggerNetworkClinics.next();
    });
  }

  ngAfterViewInit(): void {
    let latLong = [29.756271257121455, -95.36671136678271];

    if (this.location) {
      latLong = [this.location.lat, this.location.long];
    }

    this.map = L.map(this.refMap.nativeElement, {
      center: latLong,
      zoom: 12,
      minZoom: 1,
      maxZoom: 19,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.map && this.map.remove) {
      this.map.off();
      this.map.remove();
    }
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
        this.triggerFavoriteRefresh.next();
        // this.favoriteClinics = res;
      }
    });
  }

  private initMap(): void {
    let latLong = [29.756271257121455, -95.36671136678271];

    if (!this.map) {
      this.map = L.map(this.refMap.nativeElement, {
        center: latLong,
        zoom: 12,
        minZoom: 1,
        maxZoom: 19,
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    }

    if (this.location) {
      latLong = [this.location.lat, this.location.long];
      this.map.panTo(new L.latLng(this.location.lat, this.location.long));
    }

    const icon = L.icon({
      iconUrl: 'assets/icons/home-marker.svg',
      iconSize: [64, 64],
      riseOnHover: true
    });

    L.marker(
      latLong,
      { icon }
    ).addTo(this.map);
    window.dispatchEvent(new Event('resize'));
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
      this.favoriteMarkers.forEach(m => this.map.removeLayer(m));

      favorites.forEach(f => {
        const icon = L.icon({
          iconUrl: 'assets/icons/clinic-marker.svg',
          iconSize: [64, 64], // size of the icon,
          riseOnHover: true
        });

        const marker = L.marker(
          [f.geoLocation.lat, f.geoLocation.long],
          { icon }
        );
        this.favoriteMarkers.push(marker);
        this.map.addLayer(marker);
      });
      this.favoriteClinics = favorites;
      this.loading = false;
    });
  }

  private watchNetwork(): void {
    this.triggerNetworkClinics.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.getNetworkFavorites(this.addressId).pipe(catchError(() => of(undefined)))),
      map(r => {
        if (!r) {
          return [];
        }
        return r.data.clinicAddresses.map(a => {
          if (a.verifiedDetails.IsVerified) {
            return this.mapFromVerified(a.verifiedDetails, a.generalDetails);
          }

          return this.mapFromGeneralDetails(a.generalDetails);
        });
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(networkClinics => this.networkClinics = networkClinics);
  }

  private mapFromVerified(verifiedDetails: any, generalDetails: any): any {
    return {
      type: verifiedDetails.type,
      specialties: verifiedDetails.specialty,
      geoLocation: verifiedDetails.Location,
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
    const geo = generalDetails.geometry.location;

    if (generalDetails.types && generalDetails.types[0] && specialistReasonKeys[generalDetails.types[0]]) {
      specialty = generalDetails.types[0];
    }

    return {
      type: generalDetails.types ? generalDetails.types[0] : '',
      specialties: [specialty],
      geoLocation: { lat: geo.lat, long: geo.lng },
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
