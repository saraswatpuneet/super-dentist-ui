import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferralService } from '../shared/services/referral.service';

@Component({
  selector: 'app-early-access',
  templateUrl: './early-access.component.html',
  styleUrls: ['./early-access.component.scss']
})
export class EarlyAccessComponent implements OnInit {
  accessForm: FormGroup;
  @ViewChild('pms') pms: any;

  constructor(
    private fb: FormBuilder,
    private referralService: ReferralService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  submitAccess(): void {
    if (this.accessForm.valid) {
      this.referralService.requestDemo(this.accessForm.value).subscribe(console.log);
    }
  }

  private initForm(): void {
    this.accessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      practiceName: ['', Validators.required],
      locationCount: [1, Validators.required],
    });
  }
}
