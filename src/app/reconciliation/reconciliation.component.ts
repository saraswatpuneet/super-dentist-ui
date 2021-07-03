import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.scss']
})
export class ReconciliationComponent implements OnInit {
  transactions = [
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
    { date: Date.now(), pms: 'One Piece', bank: '$72,312,433', net: '$703' },
  ];
  pageSize = 20;
  displayedColumns = ['date', 'pms', 'bank', 'net'];

  constructor() { }

  ngOnInit(): void {
  }

}
