import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  sentEmail = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void { }

  resendEmail(): void {
    this.auth.currentUser.then(user => user.sendEmailVerification());
    this.auth.currentUser.then(res => {
      res.sendEmailVerification().then(() => {
        this.sentEmail = true;
      });
    });
  }

}
