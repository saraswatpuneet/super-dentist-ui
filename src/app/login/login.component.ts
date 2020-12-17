import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { catchError, take, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { auth } from 'firebase/app';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Base implements OnInit {
  loading = false;
  errorMessage = '';
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fauth: AngularFireAuth,
    private router: Router,
    private clinicService: ClinicService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    setTimeout(() => this.fauth.setPersistence(auth.Auth.Persistence.SESSION));
    this.fauth.idToken.pipe(take(1)).subscribe(token => {
      if (token) {
        this.routeToLogin();
      }
    });

  }

  createAccount(): void {
    this.router.navigate(['./join']);
  }

  signIn(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.formGroup.value;
    from(this.fauth.setPersistence(auth.Auth.Persistence.LOCAL)).pipe(
      flatMap(() => this.fauth.signInWithEmailAndPassword(email, password)),
      catchError(err => {
        this.errorMessage = err.message;
        return of(null);
      }),
      take(1)
    ).subscribe(res => {
      if (res) {
        this.routeToLogin()
      } else {
        this.loading = false;
      }
    });
  }

  private routeToLogin(): void {
    this.clinicService.getClinics().pipe(
      take(1),
    ).subscribe(myClinics => {
      const c = myClinics.data.clinicDetails[0];
      this.clinicService.setMyClinics(c);
      this.loading = false;
      if (c.type === 'specialist') {
        this.router.navigate(['/referrals']);
      } else {
        this.router.navigate(['/specialist']);
      }
    });
  }

}
