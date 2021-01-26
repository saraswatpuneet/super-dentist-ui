import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { flatMap, take, tap } from 'rxjs/operators';

import { ReferralService } from '../../../shared/services/referral.service';
import { Message, ReferralDetails } from '../../../shared/services/referral';
import { specialistReasons, specialistReasonKeys, SpecialistType } from '../../../shared/services/clinic';

@Component({
  selector: 'app-create-referral',
  templateUrl: './create-referral.component.html',
  styleUrls: ['./create-referral.component.scss']
})
export class CreateReferralComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('firstName') firstNameEl: ElementRef;
  @Input() placeId: string;
  @Input() specialty: SpecialistType;
  @Input() fromAddressId = '';
  @Output() cancel = new EventEmitter();
  files = [];
  patientForm: FormGroup;
  loading = false;
  topRight = [1, 2, 3, 4, 5, 6, 7, 8];
  topLeft = [9, 10, 11, 12, 13, 14, 15, 16];
  bottomRight = [32, 31, 30, 29, 28, 27, 26, 25];
  bottomLeft = [24, 23, 22, 21, 20, 19, 18, 17];
  selectedTeeth = {};
  userEmail = '';
  reasons: any;
  selectedReasons: string[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private referralService: ReferralService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.auth.currentUser.then(user => this.userEmail = user.email);
  }

  ngAfterViewInit(): void {
    if (this.specialty && specialistReasonKeys(this.specialty)) {
      this.reasons = specialistReasons(this.specialty);
    }

    setTimeout(() => this.firstNameEl.nativeElement.focus(), 150);

    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {
      this.files = [];
      Array.from(fileUpload.files).forEach(file => this.files.push(file));
    };
  }

  create(): void {
    if (!this.patientForm.valid) {
      return;
    }
    this.loading = true;

    let { email, phoneNumber, firstName, lastName, comments } = this.patientForm.value;

    if (this.selectedReasons.length > 0) {
      comments += ` You've been referred for: `;
      this.selectedReasons.forEach((reason, i) => {
        if (i !== this.selectedReasons.length - 1) {
          comments += ` ${this.reasons.value[reason].label},`;
        } else {
          comments += ` ${this.reasons.value[reason].label}.`;
        }
      });
    }
    const tooth = Object.keys(this.selectedTeeth);
    if (tooth && tooth.length > 0) {
      comments += `Selected Teeth:`;
      tooth.forEach((t, i) => {
        if (i !== tooth.length - 1) {
          comments += ` ${t},`;
        } else {
          comments += ` ${t}.`;
        }
      });
    }

    const referralDetails: ReferralDetails = {
      patient: {
        email,
        phone: phoneNumber,
        firstName,
        lastName,
      },
      tooth,
      toPlaceId: this.placeId,
      fromAddressId: this.fromAddressId,
      status: { gdStatus: 'referred', spStatus: 'referred' },
      reasons: this.selectedReasons,
    };

    let referralId = '';
    this.referralService.create(referralDetails).pipe(
      tap(referral => referralId = referral.referralId),
      flatMap(() => {
        if (comments) {
          return this.referralService.createMessage(referralId, this.getMessage(comments));
        }

        return this.referralService.createMessage(referralId, this.getMessage('Referral was created by ABCD'));
      }),
      flatMap(() => {
        if (this.files.length > 0) {
          const formData = new FormData();
          this.files.forEach((file, i) => formData.append(`file${i}`, file));

          return this.referralService.uploadDocuments(referralId, formData).
            pipe(flatMap(() => this.referralService.createMessage(referralId, this.getMessage('Uploaded Patient Documents'))));
        } else {
          return of(null);
        }
      }),
      take(1)
    ).subscribe(() => this.cancel.emit());
  }

  selectTooth(tooth: number): void {
    if (this.selectedTeeth[tooth]) {
      delete this.selectedTeeth[tooth];
    } else {
      this.selectedTeeth[tooth] = true;
    }
  }

  private getMessage(text: string): Message[] {
    return [{
      userId: this.userEmail,
      channel: 'c2c',
      text,
      timeStamp: Date.now()
    }];
  }

  private initForm(): void {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [''],
      phoneNumber: ['', Validators.required],
      comments: [''],
    });
  }
}
