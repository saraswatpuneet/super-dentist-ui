import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ClinicService } from './shared/services/clinic.service';

import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private clinicService: ClinicService,
    private router: Router

  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.clinicService.getClinics().pipe(
      take(1),
      map(myClinics => {
        const c = myClinics.data.clinicDetails[0];
        this.clinicService.setMyClinics(c);
        if (c.type === 'specialist') {
            this.router.navigate(['/referrals'])
            return false
        } else {
          this.router.navigate(['/specialist'])
          return true
        }
      }),
    );
  }
}
