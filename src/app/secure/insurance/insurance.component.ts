import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, map, takeUntil } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

import { insuranceAnimations } from './insurance.animations';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { Base } from 'src/app/shared/base/base-component';


@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  animations: insuranceAnimations
})
export class InsuranceComponent extends Base implements OnInit, OnDestroy {
  referralId = '';
  dentalCompanies = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private insuranceService: InsuranceService,
  ) { super(); }

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
    super.ngOnDestroy();
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
            this.insuranceService.getDentalInsurance().pipe(
              map(r => r.data),
              takeUntil(this.unsubscribe$)
            )
              .subscribe(r => {
                this.dentalCompanies = r;
              });
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
