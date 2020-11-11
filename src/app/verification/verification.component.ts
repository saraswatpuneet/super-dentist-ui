import { Component, OnInit } from '@angular/core';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  active = 0;
  selectedClinic: Clinic;
  verifiedEmail = false;
  steps = [
    { label: 'Enter your clinic details', subLabel: 'Clinic Details', step: 1 },
    { label: 'Create Account', subLabel: 'Verify Clinic', step: 2 },
  ];

  constructor(private router: Router, private clinicService: ClinicService) { }

  ngOnInit(): void {
    console.log(this.selectedClinic);
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  selectDentist(): void {
    this.selectedClinic = Clinic.GeneralDentist;
  }

  selectSpecialist(): void {
    this.selectedClinic = Clinic.Specialist;
  }

  getAllDoctors(): void {
    console.log('click');
    this.clinicService.getAllDoctors().pipe(take(1)).subscribe(console.log);
  }

  getClinics(): void {
    this.clinicService.getClinics().pipe(take(1)).subscribe(console.log);
  }
}
