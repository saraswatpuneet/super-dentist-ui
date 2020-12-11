import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
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
    this.dialogService.openCreateReferral(a);
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
      map(r => r.data.clinicAddresses.map(a => a.generalDetails)),
      takeUntil(this.unsubscribe$)
    ).subscribe(favorites => {
      this.favoriteClinics = favorites;
      this.loading = false;
    });
  }
}
