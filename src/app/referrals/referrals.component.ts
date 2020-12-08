import { Component, OnInit } from '@angular/core';
import { catchError, switchMap, take, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { Channel, Message, Referral } from '../shared/services/referral';
import { mockReferrals, ReferralService } from '../shared/services/referral.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent extends Base implements OnInit {
  addId = '';
  referrals: Referral[] = [];
  selectedReferralIndex: number;
  messageToSend = '';
  messages: Message[];
  clinicType = '';
  selectedChannel: Channel = 'c2c';
  user: firebase.User;
  private triggerMessage = new Subject();

  constructor(
    private auth: AngularFireAuth,
    private clinicService: ClinicService,
    private referralService: ReferralService
  ) { super(); }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.user = user);
    this.clinicService.getMyClinics().pipe(takeUntil(this.unsubscribe$)).subscribe(addy => {
      this.addId = addy.addressId;
      this.clinicType = addy.type;
      console.log(this.clinicType);

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

    this.watchMessages();
  }

  downloadFiles(referralId: string): void {
    this.referralService.getAllDocuments(referralId).pipe(take(1)).subscribe(res => {
      const url = window.URL.createObjectURL(new Blob([res], { type: 'application/zip' }));
      window.location.assign(url);
    });
  }

  talkTo(isClinic: boolean): void {
    if (isClinic) {
      this.selectedChannel = 'c2c';
    } else {
      this.selectedChannel = 'c2p';
    }

    this.triggerMessage.next();
  }

  referralChat(index: number): void {
    this.selectedReferralIndex = index;
    this.triggerMessage.next();
  }

  enterComment(): void {
    const referral = this.referrals[this.selectedReferralIndex];
    const message: Message = {
      text: this.messageToSend,
      userId: this.user.email,
      channel: this.selectedChannel,
      timeStamp: Date.now()
    };
    this.messages.push(message);
    const index = this.messages.length - 1;
    this.referralService.createMessage(referral.referralId,
      [message]
    )
      .pipe(take(1))
      .subscribe(mes => this.messages[index] = mes);
    this.messageToSend = '';
  }

  private watchMessages(): void {
    this.triggerMessage.pipe(
      switchMap(() =>
        this.referralService.getMessages(this.referrals[this.selectedReferralIndex].referralId, this.selectedChannel)
          .pipe(catchError(() => of([])))
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe(messages => this.messages = messages);
  }
}
