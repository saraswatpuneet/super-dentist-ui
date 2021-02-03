import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  user: firebase.default.User;
  loading = false;

  constructor(
    private auth: AngularFireAuth,
    private accountService: AccountService,
    private dialog: MatDialogRef<ForgotPasswordComponent>
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.user = user);
  }

  resetPassword(): void {
    this.loading = true;
    this.accountService.resetPassword(this.user.email)
      .pipe(take(1)).subscribe(() => {
        this.loading = false;
        this.dialog.close(true);
      });
  }
}
