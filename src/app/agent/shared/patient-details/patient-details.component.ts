import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-details2',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetails2Component implements OnInit {
  @Input() patient: any;
  @Input() months: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
