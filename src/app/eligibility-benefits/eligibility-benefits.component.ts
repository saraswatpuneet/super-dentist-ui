import { Component, OnInit } from '@angular/core';
import { Base } from '../shared/base/base-component';
import { takeUntil, map, filter, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  clinics = [];

  private patientSubject = new Subject<string>();

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.watchPatients();
    this.clinicService.getAllClinics()
      .pipe(
        filter(r => !!r),
        map(res => res.data),
        takeUntil(this.unsubscribe$))
      .subscribe(clinics => {
        this.clinics = clinics;
        console.log(clinics);
        if (clinics && clinics.length > 0) {
          this.patientSubject.next(clinics[0].addressId);
        }
      });
  }

  private watchPatients(): void {
    this.patientSubject.pipe(
      switchMap((addressId) => this.patientService.getAllPatientsForClinic(addressId)),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(console.log);
  }
}
