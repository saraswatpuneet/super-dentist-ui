import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
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
  saving = false;
  searchText = '';
  private triggerSearch = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clinicService: ClinicService,
    private dialogRef: MatDialogRef<NearbyClinicsComponent>
  ) {
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
    let clinicsToSave = [];
    let clinicsToRemove = [];
    const savedFavorites = this.data.favoriteClinics;

    this.favorites.forEach((f, i) => {
      if (!savedFavorites.some(s => s.place_id === f.place_id)) {
        clinicsToSave.push(i);
      }
    });

    savedFavorites.forEach((f, i) => {
      if (!this.favorites.some(s => s.place_id === f.place_id)) {
        clinicsToRemove.push(i);
      }
    });

    const reqs = [];
    if (clinicsToSave.length > 0) {
      clinicsToSave = clinicsToSave.map(i => this.favorites[i].place_id);
      reqs.push(this.clinicService.addFavoriteClinics(this.data.addressId, clinicsToSave).pipe(take(1)));
    }

    if (clinicsToRemove.length > 0) {
      clinicsToRemove = clinicsToRemove.map(i => savedFavorites[i].place_id);
      reqs.push(this.clinicService.removeFavoriteClinics(this.data.addressId, clinicsToRemove).pipe(take(1)));
    }

    if (reqs.length > 0) {
      this.saving = true;
      forkJoin(reqs)
        .pipe(take(1))
        .subscribe(() => this.dialogRef.close(this.favorites));
    } else {
      this.dialogRef.close();
    }
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
