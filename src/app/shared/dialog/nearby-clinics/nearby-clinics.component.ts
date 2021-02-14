import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Subject } from 'rxjs';
import { debounceTime, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { ClinicService } from '../../../shared/services/clinic.service';
import { Base } from '../../../shared/base/base-component';
import { nearbyClinicsAnimations } from './nearby-clinic.animations';
import { mapFromGeneralDetails, mapFromVerified } from '../../utils/clinic-transforms';
import { webSocket } from 'rxjs/webSocket';

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
  // private subject = webSocket({ url: 'wss://dev.superdentist.io/api/sd/v1/clinic/queryAddress', protocol: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxMDgzMDRiYWRmNDc1MWIyMWUwNDQwNTQyMDZhNDFkOGZmMWNiYTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VwZXJkZW50aXN0IiwiYXVkIjoic3VwZXJkZW50aXN0IiwiYXV0aF90aW1lIjoxNjEzMjU0NDUzLCJ1c2VyX2lkIjoiRWNlblRsaUpsQWV0TkgwdWtNU2Z0YUJCNHI1MyIsInN1YiI6IkVjZW5UbGlKbEFldE5IMHVrTVNmdGFCQjRyNTMiLCJpYXQiOjE2MTMyNTQ0NTMsImV4cCI6MTYxMzI1ODA1MywiZW1haWwiOiJzdHJhd2hhdHNwZWNpYWxpc3RAb3V0bG9vay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdHJhd2hhdHNwZWNpYWxpc3RAb3V0bG9vay5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Iz_2DqFg4eKUOTQGT6fjskI4Ec4aNv9d6YMQ_RhOP7TWAtUGM7vQXAPs32FPRYu7_hjwCWC74fTfSuGOEXyL2_rpcLRHWj4NsMZsMV0rQPONm_L3K9GOIQCKwXa1iLmYXvLC34dmWBUqrshTPkyyTPv3I9JPHHL6aDJBwVjmpyDxP9Z6Q7eYiMWGCkyyMc8tns9CoHHCpDdnwbsKfupGlZ3Jq50own3um-NsWKHDa9lVdbt724N-Hj62fkIK7bm4-7KsEq19pFKzbAigbtj1JPQoL6WLoLM4UVb0xR8ht4YTDfYZc-VlPeBJi3976iEmk2h5SD7X1gv2x5vpwKAlfQ' });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clinicService: ClinicService,
    private dialogRef: MatDialogRef<NearbyClinicsComponent>
  ) { super(); }

  ngOnInit(): void {
    // this.subject.next('Signature Smiles Houston');
    this.watchSearch();
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
      if (!savedFavorites.some(s => s.placeId === f.placeId)) {
        clinicsToSave.push(i);
      }
    });

    savedFavorites.forEach((f, i) => {
      if (!this.favorites.some(s => s.placeId === f.placeId)) {
        clinicsToRemove.push(i);
      }
    });

    const reqs = [];
    if (clinicsToSave.length > 0) {
      clinicsToSave = clinicsToSave.map(i => this.favorites[i].placeId);
      reqs.push(this.clinicService.addFavoriteClinics(this.data.addressId, clinicsToSave).pipe(take(1)));
    }

    if (clinicsToRemove.length > 0) {
      clinicsToRemove = clinicsToRemove.map(i => savedFavorites[i].placeId);
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
      map(r => r.data.clinicAddresses.map(a => {
        if (a.verifiedDetails.IsVerified) {
          return mapFromVerified(a.verifiedDetails, a.generalDetails);
        }

        return mapFromGeneralDetails(a.generalDetails);
      })),
      takeUntil(this.unsubscribe$)
    ).subscribe(general => {
      this.nearbySpecialists = general;
      this.loading = false;
    });
  }
}
