import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { catchError, flatMap, take } from 'rxjs/operators';
import { dashboardAnimations } from 'src/app/verification/dashboard.animations';

enum Clinic {
  Specialist = 0,
  GeneralDentist = 1
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations: dashboardAnimations
})
export class SignUpComponent implements OnInit {
  email = '';
  password = '';
  verifyPassword = '';
  errorMessage = '';
  loading = false;
  selectedClinic: Clinic;
  verifiedEmail = false;
  active = 0;
  steps = [
    { label: 'Clinic Selection', subLabel: 'Clinic Details', step: 1 },
    { label: 'Clinic Details', subLabel: 'Select PMS', step: 2 },
    { label: 'Select your PMS', subLabel: 'Verify', step: 3 },
    { label: 'Verify Clinic', subLabel: 'Finalize', step: 4 },
  ];

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  create(): void {
    this.errorMessage = '';
    this.loading = true;
    from(this.auth.createUserWithEmailAndPassword(this.email, this.password))
      .pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return of(err);
        }),
        flatMap(res => this.auth.currentUser),
        take(1)
      ).subscribe((currentUser) => {
        currentUser.sendEmailVerification();
        this.loading = false;
      });
  }
}
