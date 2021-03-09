import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss']
})
export class DobComponent implements OnInit {
  @Input() dobGroup: FormGroup;
  days = [];
  years = [];
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
    this.calcYears();
  }

  private calcYears(): void {
    const arrValues = [...Array(100).keys()];
    const currentYear = new Date().getFullYear();
    this.years = arrValues.map(v => currentYear - v);

    const dayValues = [...Array(31).keys()];
    this.days = dayValues.map(d => d += 1);
  }

}
