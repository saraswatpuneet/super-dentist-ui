import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-patient-details2',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetails2Component implements OnInit {
  @Input() patient: any;
  @Input() months: any = [];
  selectedStatus = '';
  status = [
    'Pending',
    'Active',
    'Inactive',
    'Termed',
    'Incomplete information',
    'Discount plan',
    'Medicare plan'
  ];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.selectedStatus = this.patient.status;
    console.log(this.patient);
  }

  updateStatus(status: string): void {
    this.patientService.updateStatus(this.patient.patientId, this.selectedStatus).pipe(take(1)).subscribe(console.log);
    // console.log(this.selectedStatus);
  }

}
