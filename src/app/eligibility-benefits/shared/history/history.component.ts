import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnChanges, OnInit {
  @Input() history = {};
  @Input() savedHistory = [];
  @Input() allCodes: DentalBreakDowns;

  constructor() { }

  ngOnChanges(): void {
    console.log(this);
  }

  ngOnInit(): void {
  }

}
