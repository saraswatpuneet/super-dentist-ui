import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { map, switchMap, take, takeUntil, tap, catchError } from 'rxjs/operators';
import { Subject, of, forkJoin, BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { DialogService } from '../shared/dialog/dialog.service';
import { SpecialistType } from '../shared/services/clinic';
import { specialistAnimations } from './specialist.animations';
import { mapFromGeneralDetails, mapFromVerified } from '../shared/utils/clinic-transforms';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss'],
  animations: specialistAnimations
})
export class SpecialistComponent extends Base implements OnInit, OnDestroy {
  @ViewChild('refEl') refEl: ElementRef;
  @ViewChild('refCardEl') refCardEl: ElementRef;
  @ViewChild('refMap') refMap: ElementRef;
  clinics = [];
  selectedQr = '';
  clinicType = '';
  favoriteClinics = [];
  networkClinics = [];
  loading = false;
  addressId = '';
  selectedSpecialty: SpecialistType;
  selectedPlaceId = '';
  showCreateReferral = false;
  showTreatmentSummary = false;
  selectedReferral: any;
  map: any;
  private checked = false;
  private favoriteMarkers = [];
  private triggerNetwork = new Subject<void>();
  private triggerFavorites = new Subject<void>();

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { super(); }

  ngOnInit(): void {
    this.loading = true;
    this.watchNetwork();
    this.watchTriggerFavorites();

    this.clinicService.getClinics().pipe(map(r => r.data.clinicDetails), takeUntil(this.unsubscribe$)).subscribe(clinics => {
      this.clinics = clinics;
      this.clinicType = 'specialist';
      if (clinics.length === 1 && clinics[0].type === 'dentist') {
        this.clinicType = 'dentist';
      }
      this.initMap();
      this.triggerFavorites.next();
      this.triggerNetwork.next();
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    if (this.map && this.map.remove) {
      this.map.off();
      this.map.remove();
    }
  }

  createReferral(clinic: any, el: any): void {
    this.selectedSpecialty = clinic.specialties[0];
    this.showCreateReferral = true;
    this.selectedPlaceId = clinic.placeId;
    this.addressId = this.clinics[0].addressId;
    this.selectedReferral = clinic;
    this.setRefElBounds(el);
  }

  createTreatmentSummary(myClinic: any, clinic: any, el: any): void {
    this.showTreatmentSummary = true;
    this.addressId = myClinic.addressId;
    this.selectedPlaceId = clinic.placeId;
    this.selectedReferral = clinic;
    this.setRefElBounds(el);
  }

  selectQrCode(clinic: any, el: any): void {
    this.selectedQr = { ...clinic };
    this.selectedReferral = clinic;
    this.setRefElBounds(el);
  }

  cancel(): void {
    this.selectedQr = undefined;
    this.addressId = undefined;
    this.selectedPlaceId = undefined;
    this.selectedSpecialty = undefined;
    this.showCreateReferral = false;
    this.showTreatmentSummary = false;
    this.refEl.nativeElement.style.height = 0;
    this.refCardEl.nativeElement.parentElement.style.transition = '0s';

    setTimeout(() => {
      this.selectedReferral = undefined;
      this.refEl.nativeElement.style.transition = '0s';
    }, 300);
  }

  editFavorites(): void {
    this.dialogService.openNearbyClinics(this.clinics[0].addressId, this.favoriteClinics).afterClosed().pipe(take(1)).subscribe(res => {
      if (!!res) {
        this.triggerFavorites.next();
      }
    });
  }

  private setRefElBounds(el: any): void {
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

  private initMap(): void {
    const loc = [this.clinics[0].Location.lat, this.clinics[0].Location.long];

    if (!this.map) {
      this.map = L.map(this.refMap.nativeElement, {
        center: loc,
        zoom: 10,
        minZoom: 1,
        maxZoom: 19,
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
    }

    const icon = L.icon({
      iconUrl: 'assets/icons/home-marker.svg',
      iconSize: [64, 64],
      riseOnHover: true
    });

    this.clinics.forEach(clinic => L.marker(
      [clinic.Location.lat, clinic.Location.long], { icon }
    ).addTo(this.map));

    window.dispatchEvent(new Event('resize'));
  }

  private watchNetwork(): void {
    this.triggerNetwork.pipe(
      tap(() => this.loading = true),
      map(() => this.clinics.map(c => c.addressId)),
      switchMap(addressIds => forkJoin(
        addressIds.map(addressId => this.clinicService.getNetworkFavorites(addressId).pipe(catchError(() => of([])), take(1))))
      ),
      map(clinics => this.mapFavs(clinics)),
      takeUntil(this.unsubscribe$)
    ).subscribe(networkClinics => this.networkClinics = networkClinics);
  }

  private watchTriggerFavorites(): void {
    this.triggerFavorites.pipe(
      map(() => this.clinics.map(c => c.addressId)),
      switchMap(addressIds => forkJoin(
        addressIds.map(addressId => this.clinicService.getFavoriteClinics(addressId).pipe(take(1))))
      ),
      map(clinics => this.mapFavs(clinics)),
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

  private mapFavs(clinics: any[]): any[] {
    const placeIds: any = {};
    const favs = [];

    clinics.forEach(f => {
      try {
        f.data.clinicAddresses.forEach(a => {
          let b: any = {};
          if (a.verifiedDetails.IsVerified) {
            b = mapFromVerified(a.verifiedDetails, a.generalDetails);
          } else {
            b = mapFromGeneralDetails(a.generalDetails);
          }

          b.qrCode = a.qrCode;

          if (!placeIds[b.placeId]) {
            placeIds[b.placeId] = true;
            favs.push(b);
          }
        });

      } catch (e) { }
    });

    return favs;
  }
}
