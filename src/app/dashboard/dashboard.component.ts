import { Component, OnInit } from '@angular/core';
import { DialogService } from '../shared/dialog/dialog.service';

import { dashboardAnimations } from './dashboard.animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: dashboardAnimations
})
export class DashboardComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void { }

  openCreateReferral(): void {
    this.dialogService.openCreateReferral();
  }
}
