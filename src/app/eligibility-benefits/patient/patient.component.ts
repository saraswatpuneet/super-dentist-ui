import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin, of, Observable } from 'rxjs';
import * as moment from 'moment';
import { switchMap, map, catchError, take, tap, takeUntil, filter } from 'rxjs/operators';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { DentalBreakDowns, months } from 'src/app/shared/services/insurance';
import { Base } from 'src/app/shared/base/base-component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent extends Base implements OnInit {
  savedRecords: any = [];
  dentalRecords: any = [];
  medicalRecords: any = [];
  loading = false;
  patient: any = {};
  addressId = '';
  clinic: any = {};
  formType = '';
  codes: any;
  codesHistory: any;
  months = months();
  allCodes = this.newSavedCodes();
  savedHistoryCodes = [];
  dentalIndicies = {
    0: 'primaryDental',
    1: 'secondaryDental',
    2: 'tertiaryDental'
  };
  medicalIndicies = {
    0: 'primaryMedical',
    1: 'secondaryMedical',
    2: 'tertiaryMedical'
  };
  private triggerPatient = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService,
  ) { super(); }

  ngOnInit(): void {
    this.getClinicCodes();
    this.checkRoute();
  }

  private checkRoute(): void {
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
      this.triggerPatient.next();
    });
  }

  private getClinicCodes(): void {
    this.triggerPatient.pipe(
      switchMap(() => {
        this.loading = true;
        const reqs = [
          this.insuranceService.getPracticeCodes().pipe(take(1), tap(allCodes => this.allCodes = allCodes)),
          this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
          this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1)),
          ...this.mapPatientNotes(),
        ];
        return forkJoin(reqs);
      }),
      map(([codes, savedCodes, savedCodesHistory, ...savedRecords]) => {
        this.allCodes = codes;
        this.savedHistoryCodes = savedCodesHistory;
        return [this.mapToCodes([codes, savedCodes]), this.mapToCodes([codes, savedCodesHistory]), savedRecords];
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([codes, codesHistory, savedRecords]) => {
      let counter = 0;
      this.medicalRecords = [];
      this.dentalRecords = [];
      this.patient.dentalInsurance.forEach((_, i) => {
        this.dentalRecords.push(savedRecords[i]);
        counter++;
      });
      this.patient.medicalInsurance.forEach((_, i) => {
        this.medicalRecords.push(savedRecords[i]);
        counter++;
      });
      this.codes = codes;
      this.codesHistory = codesHistory;
      this.loading = false;
      console.log(codes, codesHistory, this.dentalRecords, this.medicalRecords, this.patient);
    });
  }

  private mapPatientNotes(): Observable<any>[] {
    const reqs = [];
    this.patient.dentalInsurance.forEach((_, i) => {
      reqs.push(this.patientService.getPatientNotes(this.patient.patientId, this.dentalIndicies[i]).pipe(
        map(r => r.data),
        catchError(() => of(undefined)),
        map(r => JSON.parse(r)),
        take(1))
      );
    });

    this.patient.medicalInsurance.forEach((_, i) => {
      reqs.push(this.patientService.getPatientNotes(this.patient.patientId, this.medicalIndicies[i]).pipe(
        map(r => r.data),
        catchError(() => of(undefined)),
        map(r => JSON.parse(r)),
        take(1))
      );
    });

    return reqs;
  }

  private mapToCodes([insuranceCodes, clinicCodes]): DentalBreakDowns {
    const savedCodes = this.newSavedCodes();
    savedCodes.label = 'Categories';
    savedCodes.key = 'categories';
    savedCodes.breakDownKeys = [];

    if (!clinicCodes) {
      clinicCodes = [];
    }

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
