import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  openResetDialog(): void {
    this.dialogService.openForgotPassword();
  }
}
