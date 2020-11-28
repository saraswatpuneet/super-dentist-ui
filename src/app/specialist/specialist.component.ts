import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent extends Base implements OnInit {
  nearbySpecialists = [];
  favoriteClinics = [];
  loading = false;
  searchText = '';
  addId = '';
  private triggerSearch = new Subject<void>();
  private triggerFavoriteRefresh = new Subject<void>();

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { super(); }

  ngOnInit(): void {
    this.loading = true;
    this.watchSearch();
    this.watchFavorites();

    this.clinicService.getClinics().pipe(map(res => res.data.clinicDetails[0]), take(1)).subscribe(addy => {
      this.addId = addy.addressId;
      this.triggerFavoriteRefresh.next();
      this.triggerSearch.next();
    });
  }

  addFavorite(a: any): void {
    this.clinicService.addFavoriteClinic(this.addId, [a.place_id]).pipe(take(1)).subscribe(() => this.triggerFavoriteRefresh.next());
  }

  removeFavorite(a: any): void {
    this.clinicService.removeFavoriteClinics(this.addId, [a.place_id]).pipe(take(1)).subscribe(() => this.triggerFavoriteRefresh.next());
  }

  createReferral(a: any): void {
    this.dialogService.openCreateReferral(a);
  }

  searchForClinics(): void {
    this.triggerSearch.next();
  }

  private watchSearch(): void {
    this.triggerSearch.pipe(
      debounceTime(300),
      switchMap(() => this.clinicService.getNearbySpecialists2(this.addId, this.searchText)),
      map(r => r.data.clinicAddresses.map(a => a.generalDetails)),
      takeUntil(this.unsubscribe$)
    ).subscribe(general => {
      this.nearbySpecialists = general;
      this.loading = false;
    });
  }

  private watchFavorites(): void {
    this.triggerFavoriteRefresh.pipe(
      switchMap(() => this.clinicService.getFavoriteClinics(this.addId)),
      map(r => r.data.clinicAddresses.map(a => a.generalDetails)),
      takeUntil(this.unsubscribe$)
    ).subscribe(favorites => this.favoriteClinics = favorites);
  }
}
