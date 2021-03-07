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
    const data = new FormData();
    const v = this.accessForm.value;
    for (const key in v) {
      if (key) {
        data.append(key, v[key]);
      }
    }
    if (this.pms.selectedOptions && this.pms.selectedOptions.selected && this.pms.selectedOptions.selected.length > 0) {
      data.append('pms', JSON.stringify(this.pms.selectedOptions.selected.map(s => s.value)));
    }

    this.referralService.requestDemo(data).subscribe(console.log);
  }

  private initForm(): void {
    this.accessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      organization: ['', Validators.required],
      locationCount: [1, Validators.required],
    });
  }
}
