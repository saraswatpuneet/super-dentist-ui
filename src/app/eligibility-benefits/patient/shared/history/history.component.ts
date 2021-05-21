import { Component, Input } from '@angular/core';

import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() history = {};
  @Input() savedHistory = [];
  @Input() allCodes: DentalBreakDowns;
}
