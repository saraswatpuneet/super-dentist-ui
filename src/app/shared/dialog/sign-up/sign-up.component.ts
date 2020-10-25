import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email = '';
  password = '';
  verifyPassword = '';
  errorMessage = '';
  loading = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  create(): void {
    this.errorMessage = '';
    this.loading = true;
    console.log('sss');
    from(this.auth.createUserWithEmailAndPassword(this.email, this.password)).pipe(catchError(err => {
      this.errorMessage = err.message;
      return of(err);
    }), take(1)).subscribe(() => {
      this.loading = false;
    });
  }

}