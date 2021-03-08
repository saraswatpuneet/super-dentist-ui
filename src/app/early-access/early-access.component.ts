import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferralService } from '../shared/services/referral.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-early-access',
  templateUrl: './early-access.component.html',
  styleUrls: ['./early-access.component.scss']
})
export class EarlyAccessComponent implements OnInit {
  accessForm: FormGroup;
  loading = false;
  complete = false;
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
      this.loading = true;
      this.referralService.requestDemo(this.accessForm.value)
        .pipe(take(1))
        .subscribe(() => {
          this.loading = false;
          this.complete = true;
        });
    }
  }

  private initForm(): void {
    this.accessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      practiceName: ['', Validators.required],
      locationCount: [undefined, Validators.required],
    });
  }
}
