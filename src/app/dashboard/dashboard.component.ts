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
  expanded = true;
  expandedKey = 'sdNavExpanded';

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
    const expanded = localStorage.getItem(this.expandedKey);
    if (expanded === 'false') {
      this.expanded = false;
    }
  }

  openCreateReferral(): void {
    this.dialogService.openCreateReferral();
  }

  toggleNav(): void {
    this.expanded = !this.expanded;
    localStorage.setItem(this.expandedKey, `${this.expanded}`);
  }

}
