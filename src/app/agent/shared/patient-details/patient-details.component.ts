import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { take } from 'rxjs/operators';
import { PatientStatus } from 'src/app/shared/services/patient';

@Component({
  selector: 'app-patient-details2',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetails2Component implements OnChanges, OnInit {
  @Input() patient: any;
  @Input() months: any = [];
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

  ngOnChanges(sc: SimpleChanges): void {
    if (sc.patient) {
      console.log(this);
    }
  }

  ngOnInit(): void {
    if (this.patient.status && this.patient.status.value) {
      this.selectedStatusValue = this.patient.status.value;
    } else {
      this.selectedStatusValue = this.status[0].value;
    }
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    console.log(status);
    this.patientService.updateStatus(this.patient.patientId, status).pipe(take(1)).subscribe();
  }

}
