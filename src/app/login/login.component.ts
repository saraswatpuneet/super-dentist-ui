import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { Base } from 'src/app/shared/base/base-component';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    private dialogService: DialogService,
    private auth: AngularFireAuth,
    private router: Router
  ) { super(); }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createAccount(): void {
    this.dialogService.openSignUp();
  }

  signIn(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.formGroup.value;
    from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      catchError(err => {
        console.log(err);
        this.errorMessage = err.message;
        return of(null);
      }),
      take(1)
    ).subscribe(res => {
      this.loading = false;
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

}
