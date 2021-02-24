import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { flatMap, take, tap } from 'rxjs/operators';

import { ReferralService } from '../../../shared/services/referral.service';
import { Message, ReferralDetails } from '../../../shared/services/referral';

@Component({
  selector: 'app-create-treatment-summary',
  templateUrl: './create-treatment-summary.component.html',
  styleUrls: ['./create-treatment-summary.component.scss']
})
export class CreateTreatmentSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('firstName') firstNameEl: ElementRef;
  @ViewChild('headerEl') headerEl: ElementRef;
  @ViewChild('formEl') formEl: ElementRef;
  @ViewChild('actionsEl') actionsEl: ElementRef;
  @Input() fromPlaceId: string;
  @Input() referral: any;
  @Input() clinics = [];
  @Output() cancel = new EventEmitter();
  files = [];
  patientForm: FormGroup;
  loading = false;
  userEmail = '';

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
    setTimeout(() => this.firstNameEl.nativeElement.focus(), 150);

    const fileUpload = this.fileUpload.nativeElement;

    fileUpload.onchange = () => {
      this.files = [];
      Array.from(fileUpload.files).forEach(file => this.files.push(file));
    };
    this.formEl.nativeElement.style.height = `calc(100% - ${this.actionsEl.nativeElement.clientHeight + this.headerEl.nativeElement.clientHeight + 32}px)`;
  }

  create(): void {
    if (!this.patientForm.valid) {
      return;
    }
    this.loading = true;

    const { firstName, lastName, selectedClinic } = this.patientForm.value;

    const referralDetails: ReferralDetails = {
      patient: {
        firstName,
        lastName,
      },
      fromPlaceId: this.fromPlaceId,
      toAddressId: selectedClinic.addressId,
      status: { gdStatus: 'completed', spStatus: 'completed' },
      isSummary: true,
    };

    let referralId = '';

    this.referralService.create(referralDetails).pipe(
      tap(referral => referralId = referral.referralId),
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
      selectedClinic: [this.clinics[0], Validators.required],
    });
  }
}
