import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { Channel, Message, Referral } from '../shared/services/referral';
import { mockReferrals, ReferralService } from '../shared/services/referral.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  referral: Referral;
  private triggerMessage = new Subject();

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
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
    this.watchRoute();
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: this.referrals[index].referralId
      }
    });
    this.triggerMessage.next();
  }

  enterComment(): void {
    const message: Message = {
      text: this.messageToSend,
      userId: this.user.email,
      channel: this.selectedChannel,
      timeStamp: Date.now()
    };
    this.messages.push(message);
    const index = this.messages.length - 1;
    this.referralService.createMessage(this.referral.referralId,
      [message]
    )
      .pipe(take(1))
      .subscribe(mes => this.messages[index] = mes);
    this.messageToSend = '';
  }

  private watchMessages(): void {
    this.triggerMessage.pipe(
      switchMap(() =>
        this.referralService.getMessages(this.referral.referralId, this.selectedChannel)
          .pipe(catchError(() => of([])))
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe(messages => this.messages = messages);
  }

  private watchRoute(): void {
    this.route.queryParams.pipe(
      filter(params => !!params.r),
      switchMap(params => {
        return forkJoin([
          this.referralService.get(params.r).pipe(take(1)),
          this.referralService.getMessages(params.r, this.selectedChannel).pipe(catchError(() => of([])), take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([referral, messages]) => {
      this.referral = referral;
      this.messages = messages;
    });
  }
}
