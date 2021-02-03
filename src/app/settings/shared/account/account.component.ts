import { Component, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';

import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { Base } from 'src/app/shared/base/base-component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends Base implements OnInit {
  emailSent = false;
  constructor(private dialogService: DialogService) { super(); }

  ngOnInit(): void {
  }

  openResetDialog(): void {
    this.dialogService.openForgotPassword().afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(sent => {
      if (sent) {
        this.emailSent = true;
      }
    });
  }
}
