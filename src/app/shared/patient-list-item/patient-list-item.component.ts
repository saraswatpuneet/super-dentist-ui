import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.scss']
})
export class PatientListItemComponent implements OnInit {
  @Input() patient: any;
  months = [
    { label: 'January', value: '1', },
    { label: 'Febuary', value: '2', },
    { label: 'March', value: '3', },
    { label: 'April', value: '4', },
    { label: 'May', value: '5', },
    { label: 'June', value: '6', },
    { label: 'July', value: '7', },
    { label: 'August', value: '8', },
    { label: 'September', value: '9', },
    { label: 'October', value: '10', },
    { label: 'November', value: '11', },
    { label: 'December', value: '12', },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
