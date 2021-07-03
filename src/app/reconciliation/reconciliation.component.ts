import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {
  transactions = [];
  displayedColumns = ['date', 'pms', 'bank', 'net'];

  constructor() { }

  ngOnInit(): void {
  }

}
