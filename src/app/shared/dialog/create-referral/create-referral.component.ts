import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { ReferralService } from 'src/app/shared/services/referral.service';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-create-referral',
  templateUrl: './create-referral.component.html',
  styleUrls: ['./create-referral.component.scss']
})
export class CreateReferralComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  fromAddressId = '';
  chatBox = '';
  files = [];
  patientForm: FormGroup;
  loading = false;
  topTeeth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  bottomTeeth = [32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17
  ];
  selectedTeeth = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private referralService: ReferralService,
    private clinicService: ClinicService,
    private dialogRef: MatDialogRef<CreateReferralComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.clinicService.getMyClinics().pipe(take(1)).subscribe(addy => {
      this.fromAddressId = addy.addressId;
      this.chatBox = addy.type === 'dentist' ? 'gd' : 'sp';
    });
  }

  ngAfterViewInit(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      this.files = [];
      fileUpload.files.forEach(file => this.files.push({ data: file, inProgress: false, progress: 0 }));
    };
  }

  create(): void {
    if (!this.patientForm.valid) {
      return;
    }
    this.loading = true;

    const { email, phoneNumber, firstName, lastName, comments } = this.patientForm.value;
    const bod: any = {
      patient: {
        email,
        phone: phoneNumber,
        firstName,
        lastName,
      },
      tooth: Object.keys(this.selectedTeeth),
      toPlaceId: this.data.place_id,
      fromAddressId: this.fromAddressId
    };

    if (comments) {
      bod.comments = [{ comment: comments, time: Date.now(), chatBox: this.chatBox }];
    }
    this.referralService.create(bod).pipe(
      switchMap(res => {
        if (this.files.length > 0) {
          const formData = new FormData();
          this.files.forEach((file, i) => formData.append(`file${i}`, file.data));

          return this.referralService.uploadDocuments(res.referralId, formData);
        } else {
          return of(null);
        }
      }),
      take(1)
    ).subscribe(() => this.dialogRef.close());
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      comments: [''],
    });
  }
}
