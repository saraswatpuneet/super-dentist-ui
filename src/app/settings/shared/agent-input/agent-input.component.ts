import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.scss']
})
export class AgentInputComponent implements OnInit {
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
    { value: 'lt', label: 'Life time' },
  ];
  increments = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.clinicService.getClinics().pipe(
      map(clinics => clinics.data.clinicDetails),
      take(1)
    ).subscribe(console.log);
  }

  submit(): void {
    console.log(this.agentForm.value);
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
      history: this.fb.group({
        periodicExam: this.fb.array([]),
        compExam: this.fb.array([]),
        fmxPano: this.fb.array([]),
        bwx: this.fb.array([]),
        adultProphyChildProphy: this.fb.array([]),
        flTxTopicalOrVarnish: this.fb.array([]),
        sealantNumbers: this.fb.array([]),
        sdf: this.fb.array([]),
        perioMaint: this.fb.array([]),
        srp: this.fb.array([]),
        crowns: this.fb.array([]),
        restorations: this.fb.array([]),
      }),
      remarks: this.fb.group({
        insuranceRepresentativeName: [],
        callRefNumber: [],
        verifiedBy: [],
        verifiedDate: [],
      }),
    });
  }

}
