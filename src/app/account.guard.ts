import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.idTokenResult.pipe(map(token => {
      if (!token) {
        this.router.navigate(['']);
        return false;
      }

      if (['strawhatspecialist@outlook.com', 'strawhatdentist@gmail.com', 'parth@superdentist.io'].includes(token.claims.email)) {
        return true;
      }

      this.router.navigate(['./specialist']);
      return false;
    }));
  }
}
