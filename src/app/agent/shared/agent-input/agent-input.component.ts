import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { forkJoin, Subject, of } from 'rxjs';
import { take, map, switchMap, takeUntil, catchError, tap } from 'rxjs/operators';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';
import { PatientService } from 'src/app/shared/services/patient.service';
import * as moment from 'moment';
import { PatientStatus } from 'src/app/shared/services/patient';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.scss']
})
export class AgentInputComponent extends Base implements OnChanges, OnInit {
  @Input() patient: any;
  @Input() addressId = '';
  @Output() closePatient = new EventEmitter();
  showMissingToothClause = false;
  processing = false;
  agentForm: FormGroup;
  missingToothClauses = [
    { value: 'crowns', label: 'Crowns' },
    { value: 'bridges', label: 'Bridges' },
    { value: 'dentures', label: 'Dentures' },
    { value: 'implants', label: 'Implants' },
  ];
  radioOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];
  eligibilityOptions = [
    { value: 'calendar', label: 'Calendar' },
    { value: 'benefit', label: 'Benefit' },
  ];
  unitOptions = [
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
    { value: 'lt', label: 'Lifetime' },
  ];
  coordinationOfBenefits = [
    { value: 'standard', label: 'Standard' },
    { value: 'nonDuplication', label: 'Non-Duplication' },
    { value: 'doesNotCoordinate', label: 'Does not coordinate' },
    { value: 'other', label: 'Other' }
  ];
  months = [
    { label: 'January', value: '1', },
    { label: 'Febuary', value: '2', },
    { label: 'March', value: '3', },
    { label: 'April', value: '4', },
    { label: 'May', value: '5', },
    { label: 'June', value: '6', },
    { label: 'July', value: '7', },
    { label: 'August', value: '8', },
    { label: 'September', value: '9', },
    { label: 'October', value: '10', },
    { label: 'November', value: '11', },
    { label: 'December', value: '12', },
  ];
  status: PatientStatus[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'termed', label: 'Termed' },
    { value: 'incomplete', label: 'Incomplete Info' },
    { value: 'discount-plan', label: 'Discount plan' },
    { value: 'medicare-plan', label: 'Medicare plan' }
  ];
  selectedStatusValue: string;
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  codesHistory: DentalBreakDowns = this.newSavedCodes();
  increments = ['', 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  codeList = [];
  allCodes = this.newSavedCodes();
  private triggerPatient = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService
  ) { super(); }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc.addressId || sc.patient && this.patient && this.addressId) {
      this.triggerPatient.next();
    }

    if (sc.patient) {
      if (this.patient.status && this.patient.status.value) {
        this.selectedStatusValue = this.patient.status.value;
      } else {
        this.selectedStatusValue = this.status[0].value;
      }
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
    this.triggerPatient.next();
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    this.patientService.updateStatus(this.patient.patientId, status).pipe(take(1)).subscribe();
    this.patient.status = status;
  }

  onSave(): void {
    const value = {
      ...this.agentForm.value,
      ...{ codes: (this.agentForm.controls.codes as FormArray).controls.map(c => c.value) },
      ...{ medicalCodes: (this.agentForm.controls.medicalCodes as FormArray).controls.map(c => c.value) }
    };

    Object.keys(value.history).forEach(key => {
      value.history[key].forEach((history, index) => {
        if (history.date) {
          value.history[key][index].date = moment(history.date, 'MM/DD/YYYY').valueOf();
        }
      });
    });

    if (value.patientCoverage.eligibilityStartDate) {
      value.patientCoverage.eligibilityStartDate = moment(value.patientCoverage.eligibilityStartDate, 'MM/DD/YYYY').valueOf();
    }

    if (value.remarks.verifiedDate) {
      value.remarks.verifiedDate = moment(value.remarks.verifiedDate, 'MM/DD/YYYY').valueOf();
    }
    this.processing = true;
    this.patientService.setPatientNotes(this.patient.patientId, value)
      .pipe(take(1))
      .subscribe(res => this.processing = false);
  }

  toggleClause(yes: string): void {
    if (yes === 'yes') {
      this.showMissingToothClause = true;
    } else {
      this.showMissingToothClause = false;
      this.agentForm.get('patientCoverage').get('toothReplacementClause').reset();
    }
  }

  resetEligibilityYear(): void {
    if (this.agentForm.get('patientCoverage').value.eligibilityYear.value === 'calendar') {
      this.agentForm.get('patientCoverage').get('eligibilityYear').get('month').reset();
    }
  }

  resetWaitingPeriod(value: string): void {
    if (value === 'no') {
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('month').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('category').reset();
    }
  }

  private getClinicCodes(): void {
    this.triggerPatient.pipe(
      switchMap(() => {
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

      if (this.agentForm.get('patientCoverage').get('missingToothClause').value === 'yes') {
        this.showMissingToothClause = true;
      }
    });
  }

  private setCodes(groupName: string, codes: DentalBreakDowns): void {
    const codeForms: FormArray = this.agentForm.get(groupName) as FormArray;
    let codeList = [];
    codes.breakDownKeys.forEach(k => codeList = [...codeList, ...codes.breakDowns[k].breakDownKeys]);
    this.codeList = codeList;
    codes.breakDownKeys.forEach(k => {
      const codeInputs = this.fb.group({});

      codes.breakDowns[k].breakDownKeys.forEach(sk => {
        codeInputs.addControl(sk, this.fb.group({
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
        }));
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
        coordinationOfBenefits: [],
        annualMaximum: [],
        annualUsedAmount: [],
        deductibleIndividual: [],
        deductibleFamily: [],
        deductibleMetAmountIndividual: [],
        deductibleMetAmountFamily: [],
        missingToothClause: ['no'],
        waitingPeriods: this.fb.group({
          enabled: ['no'],
          category: [],
          frequency: [],
          unit: [],
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
          exclusions: ['no']
        }),
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
