import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  getNotifications(): Observable<any> {
    return of(mockNotifications());
  }
}

function mockNotifications(): any {
  return [
    {
      timestamp: Date.now(),
      type: 'referral',
      route: ''
    },
    {
      timestamp: Date.now(),
      type: 'referral',
      route: ''
    },
    {
      timestamp: Date.now(),
      type: 'referral',
      route: ''
    },
    {
      timestamp: Date.now(),
      type: 'referral',
      route: ''
    }
  ];
}
