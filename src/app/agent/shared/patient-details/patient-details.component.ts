import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { PatientService } from 'src/app/shared/services/patient.service';
import { patientStatus } from 'src/app/shared/services/insurance';

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
  @Output() statusChange = new EventEmitter<any>();
  @Output() closePatient = new EventEmitter();
  @Output() save = new EventEmitter();
  status = patientStatus();
  selectedStatusValue: string;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    if (this.patient.status && this.patient.status.value) {
      this.selectedStatusValue = this.patient.status.value;
    } else {
      this.selectedStatusValue = this.status[0].value;
    }
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    this.patientService.updateStatus(this.patient.patientId, status).pipe(take(1)).subscribe();
    this.patient.status = status;
  }
}
