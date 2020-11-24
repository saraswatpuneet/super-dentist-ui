import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  sentEmail = false;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void { }

  resendEmail(): void {
    this.auth.currentUser.then(user => user.sendEmailVerification());
    this.auth.currentUser.then(res => {
      res.sendEmailVerification().then(() => {
        this.sentEmail = true;
      });
    });
  }

  home(): void {
    this.router.navigate(['specialist']);
  }
}
