import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { takeUntil, map, switchMap, take, tap, catchError, filter } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { DentalBreakDowns, radioOptions, unitOptions } from 'src/app/shared/services/insurance';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent extends Base implements OnInit {
  patient: any;
  clinic: any;
  unitOptions = unitOptions();
  radioOptions = radioOptions();
  codeList = [];
  allCodes = this.newSavedCodes();
  increments = ['', 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  agentForm: FormGroup;
  loading = false;
  addressId = '';
  patientId = '';
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  codesHistory: DentalBreakDowns = this.newSavedCodes();
  private triggerPatient = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
    this.checkRoute();
  }

  toPatients(): void {
    this.router.navigate([`agent/clinics/${this.addressId}/patients`]);
  }

  private checkRoute(): void {
    this.route.parent.params.pipe(
      filter(p => !!p),
      switchMap(p => {
        this.addressId = p.clinicId;
        this.patientId = p.patientId;
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
        return forkJoin([
          this.insuranceService.getPracticeCodes().pipe(take(1), tap(allCodes => this.allCodes = allCodes)),
          this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
          this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1)),
          this.patientService.getPatientNotes(this.patient.patientId).pipe(map(r => r.data), catchError(() => of(undefined)), take(1))
        ]);
      }),
      map(([codes, savedCodes, savedCodesHistory, savedRecords]) =>
        [this.mapToCodes([codes, savedCodes]), this.mapToCodes([codes, savedCodesHistory]), savedRecords]
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe(([codes, codesHistory, savedRecords]) => {
      this.savedCodes = codes;
      this.loading = false;
      this.codesHistory = codesHistory;
      this.agentForm.reset();
      this.initForm();

      this.setCodes('codes', codes);
      this.setCodes('medicalCodes', codes);

      const historyGroup: FormGroup = this.agentForm.get('history') as FormGroup;
      codesHistory.breakDownKeys.forEach(k => {
        codesHistory.breakDowns[k].breakDownKeys.forEach(sk => {
          historyGroup.addControl(sk, this.fb.array([]));
        });
      });

      let value = savedRecords;
      try {
        value = JSON.parse(savedRecords);
      } catch (e) {
        value = null;
      }

      if (value) {
        if (value.patientCoverage.termDate) {
          value.patientCoverage.termDate = moment(value.patientCoverage.termDate).format('MM/DD/YYYY');
        }
        if (value.patientCoverage.eligibilityStartDate) {
          value.patientCoverage.eligibilityStartDate = moment(value.patientCoverage.eligibilityStartDate).format('MM/DD/YYYY');
        }

        if (value.remarks.verifiedDate) {
          value.remarks.verifiedDate = moment(value.remarks.verifiedDate).format('MM/DD/YYYY');
        }
        Object.keys(value.history).forEach(key => {
          value.history[key].forEach((history, index) => {
            if (history.date) {
              value.history[key][index].date = moment(history.date).format('MM/DD/YYYY');
            }
            (this.agentForm.get('history').get(key) as FormArray).push(this.fb.group(history));
          });
        });

        this.agentForm.patchValue(value);
      }
    });
  }

  private setCodes(groupName: string, codes: DentalBreakDowns): void {
    const codeForms: FormArray = this.agentForm.get(groupName) as FormArray;
    let codeList = [];
    codes.breakDownKeys.forEach(k => codeList = [...codeList, ...codes.breakDowns[k].breakDownKeys]);
    this.codeList = codeList;
    const group = {
      percent: [0],
      frequency: this.fb.group({
        numerator: [''],
        denominator: [''],
        unit: ['year'],
      }),
      ageRange: this.fb.group({
        min: [''],
        max: ['']
      }),
      medicalNecessity: ['no'],
      sharedCodes: [],
      notes: ['']
    };
    if (groupName === 'codes') {
      delete group.medicalNecessity;
    }
    codes.breakDownKeys.forEach(k => {
      const codeInputs = this.fb.group({});
      codes.breakDowns[k].breakDownKeys.forEach(sk => {
        codeInputs.addControl(sk, this.fb.group({ ...group }));
      });

      codeForms.controls.push(this.fb.group({
        [k]: this.fb.group({ fixed: [], min: [], max: [] }),
        codes: codeInputs
      }));
    });
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

  private initForm(): void {
    this.agentForm = this.fb.group({
      patientCoverage: this.fb.group({
        groupName: [],
        groupNumber: [],
        payerId: [],
        eligibilityStartDate: [],
        coordinationOfBenefits: this.fb.group({
          other: [],
          category: []
        }),
        annualMaximum: [''],
        annualUsedAmount: [''],
        deductibleIndividual: [''],
        deductibleMetAmountIndividual: [''],
        deductibleFamily: [''],
        deductibleMetAmountFamily: [''],
        missingToothClause: ['no'],
        waitingPeriods: this.fb.group({
          enabled: ['no'],
          category: [],
          frequency: [],
          unit: [],
          other: [],
          basicService: this.fb.group({
            unit: [],
            frequency: []
          }),
          majorService: this.fb.group({
            unit: [],
            frequency: []
          })
        }),
        eligibilityYear: this.fb.group({
          value: [],
          month: []
        }),
        inNetwork: ['yes'],
        preventitiveDeductedFromMaximum: ['yes'],
        feeSchedule: [],
        toothReplacementClause: this.fb.group({
          reason: [],
          numerator: [],
          denominator: [],
          unit: ['year'],
          notes: [],
          callouts: this.fb.group({
            crowns: this.fb.group({
              unit: [],
              frequency: []
            }),
            dentures: this.fb.group({
              unit: [],
              frequency: []
            }),
            implants: this.fb.group({
              unit: [],
              frequency: []
            }),
            bridges: this.fb.group({
              unit: [],
              frequency: []
            }),
          })
        }),
        generalNotes: [],
        termDate: []
      }),
      codes: this.fb.array([]),
      medicalCodes: this.fb.array([]),
      history: this.fb.group({}),
      remarks: this.fb.group({
        insuranceRepresentativeName: [],
        callRefNumber: [],
        verifiedBy: [],
        verifiedDate: [],
      }),
    });
  }
}
