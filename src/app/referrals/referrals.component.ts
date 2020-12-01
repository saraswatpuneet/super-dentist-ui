import { Component, OnInit } from '@angular/core';
import { map, take, takeUntil } from 'rxjs/operators';
import { Base } from '../shared/base/base-component';

import { ClinicService } from '../shared/services/clinic.service';
import { ReferralService } from '../shared/services/referral.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent extends Base implements OnInit {
  addId = '';
  referrals = [];
  selectedReferralIndex: number;
  messageToSend = '';
  messages = [];

  constructor(
    private clinicService: ClinicService,
    private referralService: ReferralService
  ) { super(); }

  ngOnInit(): void {
    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => this.addId = addy.addressId);
    this.referralService.getDentist().pipe(take(1)).subscribe(res => this.referrals = res.data);
  }

  downloadFiles(id: string): void {
    this.referralService.downloadDocuments(id).pipe(take(1)).subscribe(res => {
      const url = window.URL.createObjectURL(new Blob([res], { type: 'application/zip' }));
      window.location.assign(url);
    });
  }

  referralChat(index: number): void {
    this.selectedReferralIndex = index;
    this.referralService.get(this.referrals[this.selectedReferralIndex].referralId).pipe(take(1)).subscribe(console.log);
    console.log(this.referrals[this.selectedReferralIndex]);
  }

  enterComment(): void {
    const referral = this.referrals[this.selectedReferralIndex];
    this.messages.push({ message: this.messageToSend, user: 'me' });
    this.referralService.addComments(referral.referralId, this.messageToSend, 'gd').pipe(take(1)).subscribe(console.log);
    this.messageToSend = '';
  }
}
