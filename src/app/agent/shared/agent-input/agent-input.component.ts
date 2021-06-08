import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { forkJoin, Subject, of } from 'rxjs';
import { take, map, switchMap, takeUntil, catchError, tap } from 'rxjs/operators';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import {
  DentalBreakDowns,
  missingToothClauses,
  radioOptions,
  eligibilityOptions,
  unitOptions,
  coordinationOfBenefits,
  months,
  patientStatus
} from 'src/app/shared/services/insurance';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.scss']
})
export class AgentInputComponent extends Base implements OnChanges, OnInit {
  @Input() patient: any;
  @Input() formType = '';
  @Input() backButtonText = 'Patients';
  @Input() addressId = '';
  @Input() clinic: any;
  @Output() closePatient = new EventEmitter();
  @ViewChild('incompleteNotesEl') incompleteEl: ElementRef;
  groupModel = [];
  loading = false;
  processing = false;
  agentForm: FormGroup;
  missingToothClauses = missingToothClauses();
  radioOptions = radioOptions();
  eligibilityOptions = eligibilityOptions();
  unitOptions = unitOptions();
  coordinationOfBenefits = coordinationOfBenefits();
  months = months();
  status = patientStatus();
  selectedStatusValue: string;
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  codesHistory: DentalBreakDowns = this.newSavedCodes();
  increments = ['', 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  codeList = [];
  allCodes = this.newSavedCodes();
  dentalIndex = {
    primaryDental: 0,
    secondaryDental: 1,
    tertiaryDental: 2
  };
  private triggerPatient = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService,
  ) { super(); }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc.addressId || sc.patient && this.patient && this.addressId) {
      this.triggerPatient.next();
    }

    if (this.formType) {
      this.selectedStatusValue = this.patient.dentalInsurance[this.dentalIndex[this.formType]].status.value;
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
    this.triggerPatient.next();
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    const insurance = this.patient.dentalInsurance[this.dentalIndex[this.formType]];
    this.patientService.updateStatus(this.patient.patientId, status, insurance.memberId).pipe(take(1)).subscribe();
    this.patient.status = status;
    if (status.value === 'incomplete' || status.value === 'needAssistance') {
      setTimeout(() => {
        this.incompleteEl.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        setTimeout(() => {
          try {
            this.incompleteEl.nativeElement.parentElement.childNodes[2].focus();
          } catch (e) { }
        }, 800);
      }, 100);
    }
  }

  onSave(): void {
    const value = JSON.parse(JSON.stringify({
      ...this.agentForm.value,
      ...{ codes: this.groupModel },
    }));

    this.processing = true;
    this.patientService.setPatientNotes(this.patient.patientId, value, this.formType)
      .pipe(take(1))
      .subscribe(res => this.processing = false);
  }

  resetEligibilityYear(): void {
    if (this.agentForm.get('patientCoverage').value.eligibilityYear.value === 'calendar') {
      this.agentForm.get('patientCoverage').get('eligibilityYear').get('month').reset();
    }
  }

  resetWaitingPeriod(value: string): void {
    if (value === 'no') {
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('frequency').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('unit').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('other').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('basicService').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('majorService').reset();
      this.agentForm.get('patientCoverage').get('waitingPeriods').get('category').reset();
    }
  }

  private getClinicCodes(): void {
    this.triggerPatient.pipe(
      switchMap(() => {
        this.loading = true;
        return forkJoin([
          this.insuranceService.getPracticeCodes().pipe(take(1), tap(allCodes => this.allCodes = allCodes)),
          this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
          this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1)),
          this.patientService.getPatientNotes(this.patient.patientId, this.formType)
            .pipe(map(r => r.data), catchError(() => of(undefined)), take(1))
        ]);
      }),
      map(([allCodes, selectedCodeSpecific, selectedCodesHistory, savedRecords]) => {
        return [this.mapToCodes([allCodes, selectedCodeSpecific]), this.mapToCodes([allCodes, selectedCodesHistory]), savedRecords];
      }
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe(([selectedCodes, selectedCodesHistory, savedRecords]) => {
      this.savedCodes = selectedCodes;
      this.loading = false;
      this.codesHistory = selectedCodesHistory;
      this.agentForm.reset();
      this.initForm();

      this.setCodes(selectedCodes);

      const historyGroup: FormGroup = this.agentForm.get('history') as FormGroup;
      selectedCodesHistory.breakDownKeys.forEach(k => {
        selectedCodesHistory.breakDowns[k].breakDownKeys.forEach(sk => {
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
        const mapper: any = {};
        value.codes.forEach((cGroup, i) => {
          const tmp = Object.keys(cGroup).filter(c => c !== 'codes')[0];
          mapper[tmp] = {
            index: i,
            key: tmp
          };
        });

        for (let x = 0, l = this.groupModel.length; x < l; x++) {
          const group = this.groupModel[x];
          const tmp = Object.keys(group).filter(c => c !== 'codes')[0];
          if (mapper[tmp]) {
            const val = value.codes[mapper[tmp].index];
            const gKeys = Object.keys(group.codes);
            const codes = {};
            for (let y = 0, l2 = gKeys.length; y < l2; y++) {
              codes[gKeys[y]] = group.codes[gKeys[y]];
              if (val.codes[gKeys[y]]) {
                codes[gKeys[y]] = val.codes[gKeys[y]];
              }
            }
            this.groupModel[x] = {
              [tmp]: val[tmp],
              codes
            };
          }
        }

        Object.keys(historyGroup.value).forEach(key => {
          if (value.history[key]) {
            value.history[key].forEach((history, index) => {
              (this.agentForm.get('history').get(key) as FormArray).push(this.fb.group(history));
            });
          }
        });

        this.agentForm.patchValue(value);
      }
      console.log(this);
    });
  }

  private setCodes(codes: DentalBreakDowns): void {
    let codeList = [];
    this.groupModel = [];
    codes.breakDownKeys.forEach(k => codeList = [...codeList, ...codes.breakDowns[k].breakDownKeys]);
    this.codeList = codeList;
    const group = {
      percent: 0,
      frequency: {
        numerator: null,
        denominator: null,
        unit: null,
      },
      ageRange: {
        min: null,
        max: null
      },
      medicalNecessity: 'no',
      sharedCodes: [],
      notes: ''
    };

    codes.breakDownKeys.forEach(k => {
      const codeInputs = {};
      codes.breakDowns[k].breakDownKeys.forEach(sk => {
        codeInputs[sk] = JSON.parse(JSON.stringify(group));
      });
      this.groupModel.push({
        [k]: { fixed: null, min: null, max: null },
        codes: codeInputs
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
        needAssistance: [''],
        groupName: [],
        groupNumber: [],
        payerId: [],
        eligibilityStartDate: [''],
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
        termDate: ['']
      }),
      history: this.fb.group({}),
      remarks: this.fb.group({
        insuranceRepresentativeName: [],
        callRefNumber: [],
        verifiedBy: [],
        verifiedDate: [''],
      }),
    });
  }
}
