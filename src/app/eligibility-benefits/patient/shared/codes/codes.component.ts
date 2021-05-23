import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnChanges, OnInit {
  @Input() codes: DentalBreakDowns;
  @Input() savedCodes = [];

  constructor() { }

  ngOnChanges(): void {
    console.log(this);
  }

  ngOnInit(): void {
  }

}
