import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { monthsHash } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-insurance-summary',
  templateUrl: './insurance-summary.component.html',
  styleUrls: ['./insurance-summary.component.scss']
})
export class InsuranceSummaryComponent implements OnInit {
  @Input() header = '';
  @Input() insurance: any = {};
  @Output() removeInsurance = new EventEmitter();
  monthsHash = monthsHash();

  constructor() { }

  ngOnInit(): void {
  }

}
