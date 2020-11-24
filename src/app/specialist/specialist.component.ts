import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';

import { DialogService } from '../shared/dialog/dialog.service';
import { ClinicService } from '../shared/services/clinic.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {
  nearbySpecialists = [];
  loading = false;
  searchText = '';

  constructor(
    private clinicService: ClinicService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.clinicService.getClinics().pipe(
      map(res => res.data.clinicDetails[0]),
      switchMap((addy: any) => this.clinicService.getNearbySpecialists(addy.addressId)),
      map(r => r.data.clinicAddresses.map(a => a.generalDetails)),
      take(1)
    ).subscribe(general => {
      this.nearbySpecialists = general;
      this.loading = false;
    });
  }

  createReferral(a: any): void {
    this.dialogService.openCreateReferral(a);
  }

  searchForClinics(): void {
    // this.clinicService.getAddress(this.searchText).pipe(take(1)).subscribe(console.log);
  }
}
