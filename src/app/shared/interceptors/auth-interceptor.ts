import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('maps.googleapis.com/maps/api') ||
      req.url.includes('us-central1-superdentist.cloudfunctions.net/sd-qr-referral') ||
      req.url.includes('v1/qrReferral')) {
      return next.handle(req);
    }

    return from(this.auth.currentUser).pipe(
      mergeMap(user => user.getIdToken()),
      map(token => req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })),
      mergeMap(authReq => next.handle(authReq))
    );
  }
}
