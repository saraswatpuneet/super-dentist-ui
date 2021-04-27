import { Component, OnInit, Input } from '@angular/core';
import { months } from '../services/insurance';

@Component({
  selector: 'app-patient-list-item',
  templateUrl: './patient-list-item.component.html',
  styleUrls: ['./patient-list-item.component.scss']
})
export class PatientListItemComponent implements OnInit {
  @Input() patient: any;
  months = months();

  constructor() { }

  ngOnInit(): void {
  }

}
