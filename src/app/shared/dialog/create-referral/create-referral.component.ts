import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

import { ReferralService } from 'src/app/shared/services/referral.service';

@Component({
  selector: 'app-create-referral',
  templateUrl: './create-referral.component.html',
  styleUrls: ['./create-referral.component.scss']
})
export class CreateReferralComponent implements OnInit {
  patientForm: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private fb: FormBuilder,
    private referralService: ReferralService,
    private dialogRef: MatDialogRef<CreateReferralComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  create(): void {
    if (!this.patientForm.valid) {
      return;
    }
    this.loading = true;

    const { email, phoneNumber, fullName, comments } = this.patientForm.value;

    this.referralService.create({
      patient: {
        email,
        phone: phoneNumber,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ')[1]
      },
      comments: [{
        comment: comments,
      }],
      toPlaceId: this.data.place_id
    }).pipe(take(1)).subscribe(() => this.dialogRef.close());
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      comments: [''],
    });

  }

}
