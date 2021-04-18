import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';

import { ClinicService } from './shared/services/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class IsClinicGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private clinicService: ClinicService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.clinicService.getClinics().pipe(
      map(r => r.data.clinicDetails),
      mergeMap((asdf) => {
        if (asdf[0].type === 'dentist' || asdf[0].type === 'specialist') {
          return of(true);
        }

        return of(false);
      }),
    );
  }
}
