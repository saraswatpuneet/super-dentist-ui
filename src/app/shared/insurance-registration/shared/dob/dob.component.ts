import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { months } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-dob',
  templateUrl: './dob.component.html',
  styleUrls: ['./dob.component.scss']
})
export class DobComponent implements OnInit {
  @Input() dobGroup: FormGroup;
  days = [];
  years = [];
  months = months();

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
