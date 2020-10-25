import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { Base } from 'src/app/shared/base/base-component';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Base implements OnInit {
  email = '';
  password = '';
  verifyPassword = '';
  loading = false;
  errorMessage = '';

  constructor(
    private dialogService: DialogService,
    private auth: AngularFireAuth,
    private router: Router
  ) { super(); }

  ngOnInit(): void {
  }

  createAccount(): void {
    this.dialogService.openSignUp();
  }

  signIn(): void {
    this.loading = true;
    this.errorMessage = '';
    from(this.auth.signInWithEmailAndPassword(this.email, this.password)).pipe(
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
