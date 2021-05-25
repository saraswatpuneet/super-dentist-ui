import { Component, OnInit, Input } from '@angular/core';

import { patientStatus, monthsHash } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-patient-details2',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetails2Component implements OnInit {
  @Input() patient: any;
  @Input() insurance: any;
  @Input() months: any = [];
  @Input() processing = false;
  status = patientStatus();
  monthsHash = monthsHash();
  selectedStatusValue: string;

  constructor() { }

  ngOnInit(): void {
    if (this.patient.status && this.patient.status.value) {
      this.selectedStatusValue = this.patient.status.value;
    } else {
      this.selectedStatusValue = this.status[0].value;
    }
  }
}
