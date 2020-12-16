import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.user.pipe(map(user => 
      req.clone({
      setHeaders: { Authorization: `Bearer `+ user.getIdToken() }
    })),
      mergeMap(authReq => next.handle(authReq))
    );
  }
}
