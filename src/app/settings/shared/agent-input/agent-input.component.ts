import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agent-input',
  templateUrl: './agent-input.component.html',
  styleUrls: ['./agent-input.component.scss']
})
export class AgentInputComponent implements OnInit {
  agentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  submit(): void {
    console.log(this.agentForm);
  }

  private initForm(): void {
    this.agentForm = this.fb.group({
      patientCoverage: this.fb.group({
        eligibilityStartDate: [],
        coordinationOfBenefits: [],
        annualMaximum: [],
        annualUsedAmount: [],
        deductibleInd: [],
        deductibleFamily: [],
        deductibleMetAmountInd: [],
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
        periodicExam: [],
        compExam: [],
        fmxPano: [],
        bwx: [],
        adultProphyChildProphy: [],
        flTxTopicalOrVarnish: [],
        sealantNumbers: [],
        sdf: [],
        perioMaint: [],
        srp: [],
        crowns: [],
        restorations: [],
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
