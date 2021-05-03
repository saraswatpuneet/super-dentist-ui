import { Component, OnInit } from '@angular/core';
import { takeUntil, switchMap, filter, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Base } from 'src/app/shared/base/base-component';

@Component({
  selector: 'app-dental-insurance',
  templateUrl: './dental-insurance.component.html',
  styleUrls: ['./dental-insurance.component.scss']
})
export class DentalInsuranceComponent extends Base implements OnInit {
  addressId = '';
  patientId = '';
  clinic: any;
  patient: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientService,
  ) { super(); }

  ngOnInit(): void {
    this.route.parent.params.pipe(
      filter(p => !!p),
      switchMap(p => {
        this.addressId = p.clinicId;
        return forkJoin([
          this.clinicService.getClinic(p.clinicId).pipe(take(1)),
          this.patientService.getPatient(p.patientId).pipe(take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([clinic, patient]) => {
      this.clinic = clinic;
      this.patient = patient;
    });
  }

}
