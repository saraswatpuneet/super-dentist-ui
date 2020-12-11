import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { nearbyClinicsAnimations } from './nearby-clinic.animations';

@Component({
  selector: 'app-nearby-clinics',
  templateUrl: './nearby-clinics.component.html',
  styleUrls: ['./nearby-clinics.component.scss'],
  animations: nearbyClinicsAnimations
})
export class NearbyClinicsComponent extends Base implements OnInit {
  nearbySpecialists = [];
  favorites = [];
  loading = false;
  searchText = '';
  private triggerSearch = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private clinicService: ClinicService,) {
    super();
  }

  ngOnInit(): void {
    this.watchSearch();
    console.log(this.data);
    this.favorites = [...this.data.favoriteClinics];
    this.triggerSearch.next();
  }

  addFavorite(a: any, index: number): void {
    this.nearbySpecialists.splice(index, 1);
    this.favorites.push(a);
  }

  removeFavorite(a: any, index: number): void {
    this.favorites.splice(index, 1);
    this.nearbySpecialists.push(a);
  }

  searchForClinics(): void {
    this.triggerSearch.next();
  }

  updateFavorites(): void {
    const newIndex = [];
    console.log(this.data.favoriteClinics, this.favorites);
    this.favorites.forEach((f, i) => {
      if (!this.data.favoriteClinics.includes(f.place_id)) {
        newIndex.push(i);
      }
    });

    // this.favorites.forEach((f, i) => {

    // });
    // this.clinicService.addFavoriteClinics(this.data.addressId, this.favorites.map(f => f.plac_id))
    //   .pipe(take(1))
    //   .subscribe();
  }

  private watchSearch(): void {
    this.triggerSearch.pipe(
      tap(() => this.loading = true),
      debounceTime(300),
      switchMap(() => this.clinicService.getNearbySpecialists(this.data.addressId, this.searchText)),
      map(r => r.data.clinicAddresses.map(a => a.generalDetails)),
      takeUntil(this.unsubscribe$)
    ).subscribe(general => {
      this.nearbySpecialists = general;
      this.loading = false;
    });
  }
}
