import { Component, OnInit } from '@angular/core';
import { take, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  showInsurance = false;
  clinics: any[];
  patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService
  ) { super(); }

  ngOnInit(): void {
    this.clinicService.getClinics().pipe(
      map(res => res.data.clinicDetails),
      switchMap(clinics => {
        this.clinics = clinics;
        return forkJoin(this.clinics.map(clinic =>
          this.patientService.getAllPatientsForClinic(clinic.addressId).pipe(map(p => p.data), take(1))
        ));
      }),
      take(1)
    ).subscribe(res => {
      this.patients = res;
      this.patients.forEach(group => group.sort((a, b) => b.createdOn - a.createdOn));
      console.log(this.patients);
    });
  }

  onCancelRegistration(): void {
    this.showInsurance = false;
  }
}
