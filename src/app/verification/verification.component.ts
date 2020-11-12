import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { dashboardAnimations } from './dashboard.animations';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  clinicForm: FormGroup;
  accountForm: FormGroup;
  steps = [
    { label: 'Enter your clinic details', step: 1 },
    { label: 'Create Account', step: 2 },
  ];

  constructor(private router: Router, private fb: FormBuilder, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.initForm();
  }

  goToLogin(): void {
    this.router.navigate(['./login']);
  }

  getAllDoctors(): void {
    console.log('click');
    this.clinicService.getAllDoctors().pipe(take(1)).subscribe(console.log);
  }

  getClinics(): void {
    this.clinicService.getClinics().pipe(take(1)).subscribe(console.log);
  }

  private initForm(): void {
    this.clinicForm = this.fb.group({
      selectedClinic: [1],
      clinicName: ['', Validators.required],
      clinicAddress: ['', Validators.required],
      clinicNumber: [undefined, Validators.required],
    });

    this.accountForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
}
