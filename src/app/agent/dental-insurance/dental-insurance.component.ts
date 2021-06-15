import { Component, OnInit } from '@angular/core';
import { takeUntil, switchMap, filter, take, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Base } from 'src/app/shared/base/base-component';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';
import { InsuranceService } from 'src/app/shared/services/insurance.service';

@Component({
  selector: 'app-dental-insurance',
  templateUrl: './dental-insurance.component.html',
  styleUrls: ['./dental-insurance.component.scss']
})
export class DentalInsuranceComponent extends Base implements OnInit {
  addressId = '';
  patientId = '';
  insuranceIndex = 0;
  formType = '';
  clinic: any;
  patient: any;
  savedCodes: DentalBreakDowns = this.newSavedCodes();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.title.setTitle('SuperDentist - Dental Insurance');
    this.route.queryParams.pipe(take(1)).subscribe(p => {
      this.formType = p.formType;
    });
    this.route.parent.params.pipe(
      filter(p => !!p),
      switchMap(p => {
        this.addressId = p.clinicId;
        this.getClinicCodes();
        return forkJoin([
          this.clinicService.getClinic(p.clinicId).pipe(map(d => d.data), take(1)),
          this.patientService.getPatient(p.patientId).pipe(map(d => d.data), take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([clinic, patient]) => {
      this.clinic = clinic;
      this.patient = patient;
      try {
        for (let x = 0, l = patient.dentalInsurance.length; x < l; x++) {
          if (patient.dentalInsurance[x].id === this.formType) {
            this.insuranceIndex = x;
            break;
          }
        }
      } catch (e) {
      }
    });
  }

  backToPatients(): void {
    this.router.navigate([`agent/clinics/${this.addressId}/patients`], {
      queryParamsHandling: 'preserve',
    });
  }

  private getClinicCodes(): void {
    forkJoin([
      this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
      this.insuranceService.getPracticeCodes().pipe(take(1))
    ]).pipe(
      map(res => this.mapToCodes(res)),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(codes => {
        this.savedCodes = codes;
      });
  }

  private mapToCodes([clinicCodes, insuranceCodes]): any {
    const savedCodes = this.newSavedCodes();
    savedCodes.label = 'Categories';
    savedCodes.key = 'categories';
    savedCodes.breakDownKeys = [];
    clinicCodes.forEach(group => {
      const groupId = group.groupId;
      savedCodes.breakDownKeys.push(groupId);
      const breakDowns = {};
      group.codeIds.forEach(id => breakDowns[id] = insuranceCodes.breakDowns[groupId].breakDowns[id]);
      savedCodes.breakDowns[groupId] = {
        key: groupId,
        label: insuranceCodes.breakDowns[groupId].label,
        breakDownKeys: group.codeIds,
        breakDowns,
      };
    });

    return savedCodes;
  }

  private newSavedCodes(): DentalBreakDowns {
    return {
      key: '',
      label: '',
      breakDownKeys: [],
      breakDowns: {}
    };
  }

}
