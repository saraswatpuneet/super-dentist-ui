import { Component, OnInit } from '@angular/core';
declare var firebase;

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss']
})
export class SignUpDialogComponent implements OnInit {
  email = '';
  password = '';
  verifyPassword = '';

  constructor() { }

  ngOnInit(): void {
  }

  create(): void {
    console.log('sss');
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

}
