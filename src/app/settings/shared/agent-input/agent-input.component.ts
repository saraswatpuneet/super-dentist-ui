import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { take, map, switchMap, takeUntil } from 'rxjs/operators';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.scss']
})
export class AgentInputComponent extends Base implements OnInit {
  agentForm: FormGroup;
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
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  codesHistory: DentalBreakDowns = this.newSavedCodes();
  increments = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
  }

  submit(): void {
    const value = { ...this.agentForm.value, ...{ codes: (this.agentForm.controls.codes as FormArray).controls.map(c => c.value) } };
    Object.keys(value.history).forEach(key => {
      value.history[key].forEach((history, index) => {
        value.history[key][index].date = history.date.valueOf();
      });
    });
    value.patientCoverage.eligibilityStartDate = value.patientCoverage.eligibilityStartDate.valueOf();
    value.remarks.verifiedDate = value.remarks.verifiedDate.valueOf();
    console.log(value);
  }

  private getClinicCodes(): void {
    this.clinicService.getClinics()
      .pipe(
        map(res => res.data.clinicDetails),
        switchMap(clinics => {
          return forkJoin([
            this.insuranceService.getPracticeCodes().pipe(take(1)),
            this.clinicService.getSelectedPracticeCodes(clinics[0].addressId).pipe(map(r => r.data), take(1)),
            this.clinicService.getSelectedPracticeCodesHistory(clinics[0].addressId).pipe(map(r => r.data), take(1)),
          ]);
        }),
        map(([codes, savedCodes, savedCodesHistory]) => {
          return [this.mapToCodes([codes, savedCodes]), this.mapToCodes([codes, savedCodesHistory])];
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([codes, codesHistory]) => {
        this.savedCodes = codes;
        this.codesHistory = codesHistory;

        const codeForms: FormArray = this.agentForm.get('codes') as FormArray;
        codes.breakDownKeys.forEach(k => {
          const codeInputs = this.fb.group({});

          codes.breakDowns[k].breakDownKeys.forEach(sk => {
            codeInputs.addControl(sk, this.fb.group({
              percent: [10],
              frequency: this.fb.group({
                numerator: [''],
                denominator: [''],
                unit: ['year'],
              }),
              ageRange: this.fb.group({
                min: [''],
                max: ['']
              }),
              medicalNecessity: ['no']
            }));
          });

          codeForms.controls.push(this.fb.group({
            [k]: [20],
            codes: codeInputs
          }));
        });

        const historyGroup: FormGroup = this.agentForm.get('history') as FormGroup;
        codesHistory.breakDownKeys.forEach(k => {
          codesHistory.breakDowns[k].breakDownKeys.forEach(sk => {
            historyGroup.addControl(sk, this.fb.array([]));
          });
        });
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
        eligibilityStartDate: [],
        coordinationOfBenefits: [],
        annualMaximum: [],
        annualUsedAmount: [],
        deductibleIndividual: [],
        deductibleFamily: [],
        deductibleMetAmountIndividual: [],
        deductibleMetAmountFamily: [],
        missingToothClause: ['no'],
        waitingPeriods: ['yes'],
        eligibilityYear: ['calendar'],
        inNetwork: ['yes'],
        preventitiveDeductedFromMaximum: ['yes'],
        feeSchedule: [],
        toothReplacementClause: this.fb.group({
          numerator: [],
          denominator: [],
          unit: ['year'],
          exclusions: ['no']
        }),
      }),
      codes: this.fb.array([]),
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