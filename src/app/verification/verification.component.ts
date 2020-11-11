import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  active = 0;
  selectedClinic: Clinic = 1;
  verifiedEmail = false;
  steps = [
    { label: 'Enter your clinic details', step: 1 },
    { label: 'Create Account', step: 2 },
  ];

  constructor(private router: Router, private clinicService: ClinicService) { }

  ngOnInit(): void {
    console.log(this.selectedClinic);
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  selectClinic(): void {
    // this.selectedClinic = this.selec;
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
