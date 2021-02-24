import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { notificationAnimations } from './notification.animations';
import { NotificationService, notificationIcons } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: notificationAnimations
})
export class NotificationComponent implements OnInit {

  opened = false;
  unseenNotifications = 7;
  notifications$: Observable<any>;
  iconMap = notificationIcons();

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications$ = this.notificationService.getNotifications().pipe(
      tap(console.log),
    );
  }

  toggle(): void {
    this.opened = !this.opened;
  }
}
