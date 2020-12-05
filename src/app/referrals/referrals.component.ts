import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, take, takeUntil } from 'rxjs/operators';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { ChatBox } from '../shared/services/referral';
import { Conversation, Message, Referral } from '../shared/services/referral2';
import { mockConversation, mockReferrals, ReferralService2 } from '../shared/services/referral2.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent extends Base implements OnInit {
  addId = '';
  clinicType: ChatBox = 'sp';
  referrals: Referral[] = [];
  selectedReferralIndex: number;
  messageToSend = '';
  conversation: Conversation;

  constructor(
    private clinicService: ClinicService,
    private referralService: ReferralService2
  ) { super(); }

  ngOnInit(): void {
    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => {
      this.addId = addy.addressId;
      this.clinicType = addy.type === 'dentist' ? 'gd' : 'sp';
      console.log('Did this go?');
      if (addy.type === 'dentist') {
        this.referralService.getDentistRerrals(this.addId).pipe(
          catchError(() => mockReferrals()),
          take(1)
        )
          .subscribe(res => this.referrals = res);
      } else {
        this.referralService.getSpecialistReferrals(this.addId).pipe(
          catchError(() => mockReferrals()),
          take(1)
        )
          .subscribe(res => this.referrals = res);
      }
    });
  }

  downloadFiles(referralId: string): void {
    this.referralService.getAllDocuments(referralId).pipe(take(1)).subscribe(res => {
      const url = window.URL.createObjectURL(new Blob([res], { type: 'application/zip' }));
      window.location.assign(url);
    });
  }

  referralChat(index: number): void {
    this.selectedReferralIndex = index;
    this.referralService.getMessages(this.referrals[this.selectedReferralIndex].referralId, 'c2c')
      .pipe(
        catchError(() => mockConversation()),
        take(1)
      )
      .subscribe(conversation => this.conversation = conversation);
  }

  enterComment(): void {
    const referral = this.referrals[this.selectedReferralIndex];
    const message: Message = {
      text: this.messageToSend,
      userId: 'xthecounsel@gmail.com',
      channel: 'c2c',
      timestamp: Date.now()
    };
    this.conversation.messages.push(message);
    this.referralService.createMessage(referral.referralId, {
      text: this.messageToSend,
      channel: 'c2c'
    })
      .pipe(take(1))
      .subscribe(console.log);
    this.messageToSend = '';
  }
}
