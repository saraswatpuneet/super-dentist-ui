import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  @Input() patient: any;
  @Input() months: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
