import { Component, OnInit } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { ClinicService } from '../shared/services/clinic.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {
  nearbySpecialists = [];
  loading = false;

  constructor(private clinicService: ClinicService) { }

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
}
