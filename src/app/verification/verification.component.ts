import { Component, OnInit } from '@angular/core';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take } from 'rxjs/operators';

enum Clinic {
  Specialist = 0,
  GeneralDentist = 1
}

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
  animations: dashboardAnimations
})
export class VerificationComponent implements OnInit {
  selectedClinic: Clinic;
  verifiedEmail = false;
  active = 0;
  steps = [
    { label: 'Clinic Selection', subLabel: 'Clinic Details', step: 1 },
    { label: 'Clinic Details', subLabel: 'Verify Clinic', step: 2 },
    { label: 'Verify Clinic', subLabel: 'Finalize', step: 2 },
  ];

  constructor(private clinicService: ClinicService) { }

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

  getAllDoctors(): void {
    console.log('click');
    this.clinicService.getAllDoctors().pipe(take(1)).subscribe(console.log);
  }

  getClinics(): void {
    this.clinicService.getClinics().pipe(take(1)).subscribe(console.log);
  }
}
