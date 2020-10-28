import { Component, OnInit } from '@angular/core';
import { DialogService } from '../shared/dialog/dialog.service';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: dashboardAnimations
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void { }

  openCreateReferral(): void {
    this.dialogService.openCreateReferral();
  }

  getAllDoctors(): void {
    console.log('click');
    this.clinicService.getAllDoctors().pipe(take(1)).subscribe(console.log);
  }

  getClinics(): void {
    this.clinicService.getClinics().pipe(take(1)).subscribe(console.log);
  }
}
