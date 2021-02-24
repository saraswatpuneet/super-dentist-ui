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

export function notificationIcons(): any {
  return {
    referral: 'message',
    specialist: 'date_range'
  };
}

function mockNotifications(): any {
  return [
    {
      timestamp: Date.now(),
      type: 'referral',
      route: 'referrals',
      note: 'XYZ created a new referral'
    },
    {
      timestamp: Date.now() - 10000000,
      type: 'specialist',
      route: 'specialist',
      note: 'ABC joined your network'
    },
    {
      timestamp: Date.now() - 100000000,
      type: 'specialist',
      route: 'specialist',
      note: 'ABC joined your network'
    },
    {
      timestamp: Date.now() - 1000000000,
      type: 'referral',
      route: 'referrals',
      note: 'XYZ created a new referral'
    },
  ];
}
