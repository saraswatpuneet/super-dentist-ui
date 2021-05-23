import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { coordinationOfBenefitsKeyValue, radioOptionsKeyValue, eligibilityOptionsKeyValue, missingToothClausesKeyValue } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnChanges, OnInit {
  @Input() patient: any;
  @Input() months: any = [];
  @Input() patientCoverage = {};
  coordinationOfBenefits = coordinationOfBenefitsKeyValue();
  radioOptions = radioOptionsKeyValue();
  eligibilityOptions = eligibilityOptionsKeyValue();
  categories = missingToothClausesKeyValue();

  constructor() { }

  ngOnChanges(): void {
    console.log(this.patientCoverage);
  }

  ngOnInit(): void {
  }

}
