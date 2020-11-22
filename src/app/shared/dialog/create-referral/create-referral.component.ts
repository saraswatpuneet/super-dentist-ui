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
  topTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  bottomTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17
  ];
  selectedTeeth = {};

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
      tooth: Object.keys(this.selectedTeeth),
      toPlaceId: this.data.place_id
    }).pipe(take(1)).subscribe(() => this.dialogRef.close());
  }

  selectTooth(tooth: number): void {
    if (this.selectedTeeth[tooth]) {
      delete this.selectedTeeth[tooth];
    } else {
      this.selectedTeeth[tooth] = true;
    }
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
