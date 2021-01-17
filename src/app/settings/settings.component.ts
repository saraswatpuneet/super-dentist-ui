import { Component, OnInit } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';

import { ClinicService } from '../shared/services/clinic.service';
import { Base } from '../shared/base/base-component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends Base implements OnInit {

  myClinics = [];

  constructor(private clinicService: ClinicService) { super(); }

  ngOnInit(): void {
    this.clinicService.getClinics().pipe(
      map(r => r.data.clinicDetails),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinics => {
      this.myClinics = clinics;
    });

    // Send Treatment Summary

    // this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(clinics => {
    //   this.myClinics = clinics;
    // });
  }
}
