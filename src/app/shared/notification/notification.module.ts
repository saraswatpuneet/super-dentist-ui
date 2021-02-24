import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { NotificationComponent } from './notification.component';
import { TimeagoModule } from '../timeago/timeago.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    TimeagoModule,
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }
