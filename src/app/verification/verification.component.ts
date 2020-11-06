import { Component, OnInit } from '@angular/core';
import { DialogService } from '../shared/dialog/dialog.service';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take } from 'rxjs/operators';

enum Clinic {
  Specialist = 0,
  GeneralDentist = 1
}

enum PMS {
  CurveDental,
  Dentrix,
  DentrixAscend,
  Denticon,
  Eaglesoft,
  EndoVision,
  OpenDental,
  OMSVision,
  TotalDental,
  Dovetail,
  Dentisoft,
  EasyDental,
  Dentimax,
  Datacon,
  DentalIntelligence,
}

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  animations: dashboardAnimations
})
export class VerificationComponent implements OnInit {
  selectedClinic: Clinic;
  active = 0;
  steps = [
    { label: 'Clinic Selection', subLabel: 'Clinic Details', step: 1 },
    { label: 'Clinic Details', subLabel: 'Select PMS', step: 2 },
    { label: 'Select your PMS', subLabel: 'Verify', step: 3 },
    { label: 'Verify Clinic', subLabel: 'Finalize', step: 4 },
  ];
  pms = [
    { label: 'Curve Dental', value: PMS.CurveDental, selected: false },
    { label: 'Datacon', value: PMS.Datacon, selected: false },
    { label: 'Dental Intelligence', value: PMS.DentalIntelligence, selected: false },
    { label: 'Denticon', value: PMS.Denticon, selected: false },
    { label: 'Dentimax', value: PMS.Dentimax, selected: false },
  ];
  pms2 = [
    { label: 'Dentisoft', value: PMS.Dentisoft, selected: false },
    { label: 'Dentrix Ascend', value: PMS.DentrixAscend, selected: false },
    { label: 'Dentrix', value: PMS.Dentrix, selected: false },
    { label: 'Dovetail', value: PMS.Dovetail, selected: false },
    { label: 'Eaglesoft', value: PMS.Eaglesoft, selected: false },
  ];

  pms3 = [
    { label: 'Easy Dental', value: PMS.EasyDental, selected: false },
    { label: 'EndoVision', value: PMS.EndoVision, selected: false },
    { label: 'OMS Vision', value: PMS.OMSVision, selected: false },
    { label: 'OpenDental', value: PMS.OpenDental, selected: false },
    { label: 'Total Dental', value: PMS.TotalDental, selected: false },
  ];

  constructor(
    private dialogService: DialogService,
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void {
    console.log(this.selectedClinic);
  }

  selectDentist(): void {
    this.selectedClinic = Clinic.GeneralDentist;
    this.active = 1;
  }

  selectSpecialist(): void {
    this.selectedClinic = Clinic.Specialist;
    this.active = 1;
  }

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
