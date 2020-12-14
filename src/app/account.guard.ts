import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { ClinicService } from './shared/services/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(
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
          this.router.navigate(['/referrals']);
          return false;
        }

        this.router.navigate(['/specialist']);
        return true;
      }),
    );
  }
}
