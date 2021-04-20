import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';

import { PatientService } from 'src/app/shared/services/patient.service';
import { PatientStatus } from 'src/app/shared/services/patient';

@Component({
  selector: 'app-patient-details2',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetails2Component implements OnInit {
  @Input() patient: any;
  @Input() months: any = [];
  @Output() statusChange = new EventEmitter<any>();
  @Output() closePatient = new EventEmitter();
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
