import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Title } from '@angular/platform-browser';

import { ReferralService } from '../shared/services/referral.service';

@Component({
  selector: 'app-early-access',
  templateUrl: './early-access.component.html',
  styleUrls: ['./early-access.component.scss']
})
export class EarlyAccessComponent implements OnInit, OnDestroy {
  accessForm: FormGroup;
  loading = false;
  complete = false;
  @ViewChild('pms') pms: any;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private referralService: ReferralService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.signIn();
    this.initForm();
    this.title.setTitle('SuperDentist - Early Access');
  }

  ngOnDestroy(): void {
    this.auth.signOut();
  }

  submitAccess(): void {
    if (this.accessForm.valid) {
      this.loading = true;
      this.referralService.requestDemo(this.accessForm.value)
        .pipe(take(1))
        .subscribe(() => {
          this.loading = false;
          this.complete = true;
        });
    }
  }

  private signIn(): void {
    this.auth.signInAnonymously()
      .then((d) => {
        // Signed in..
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var uid = user.uid;
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // ...
      });
  }

  private initForm(): void {
    this.accessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      practiceName: ['', Validators.required],
      locationCount: [undefined, Validators.required],
    });
  }
}
