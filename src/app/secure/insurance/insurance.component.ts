import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router, ActivatedRoute } from '@angular/router';
import { insuranceAnimations } from './insurance.animations';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  animations: insuranceAnimations
})
export class InsuranceComponent implements OnInit, OnDestroy {
  referralId = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (!params.referral) {
        this.router.navigate(['404']);
        return;
      }
      this.referralId = params.referral;
    });
    this.signIn();
  }

  ngOnDestroy(): void {
    this.auth.signOut();
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
}
