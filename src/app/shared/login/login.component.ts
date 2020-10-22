import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

declare var firebase;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  verifyPassword = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  createAccount(): void {
    this.dialog.open(SignUpDialogComponent, {});
  }

  signIn(): void {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
      // // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // ...
    });
  }

  createUser(): void {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  signOut(): void {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
  // sd074AYCZ.Medical
  // superdentist.admin@superdentist.io
}
