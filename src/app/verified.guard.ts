import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.authState.pipe(
      take(1),
      map(authState => {
        console.log(authState.emailVerified);

        // if (!authState.emailVerified) {
        //   this.router.navigate(['./verification']);
        //   return false;
        // }

        return true;
      }),
    );
  }
}
