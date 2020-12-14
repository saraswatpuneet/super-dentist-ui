import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, take, takeUntil } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { Channel, ClinicStatus, Message, Referral, referredStatus, sortReferredStatus } from '../shared/services/referral';
import { ReferralService } from '../shared/services/referral.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-referrals-beta',
  templateUrl: './referrals-beta.component.html',
  styleUrls: ['./referrals-beta.component.scss']
})
export class ReferralsBetaComponent extends Base implements OnInit {
  files: any;
  addId = '';
  referrals: Referral[] = [];
  referralColumns: string[] = ['select', 'dateReferred', 'patientName', 'phoneNumber', 'referringClinic', 'actions'];
  selection = new SelectionModel<any>(true, []);
  selectedReferralIndex: number;
  messageToSend = '';
  messages: Message[];
  tabIndex = 0;
  clinicType = '';
  selectedChannel: Channel = 'c2c';
  user: firebase.User;
  referral: Referral;
  uploadingDocuments = false;
  referredStatuses = referredStatus();
  sortedStatuses = sortReferredStatus();
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

      if (addy.type === 'dentist') {
        this.referralService.getDentistRerrals(this.addId).pipe(
          catchError(() => of([])),
          take(1)
        )
          .subscribe(res => this.referrals = res);
      } else {
        this.referralService.getSpecialistReferrals(this.addId).pipe(
          catchError(() => of([])),
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
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.referrals.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.referrals.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  filterReferrals(tabIndex: number): void {
    this.selection.clear();
  }

  updateStatus(referralId: string, status: ClinicStatus): void {
    console.log(referralId, status);
    this.referralService.updateStatus(referralId, { gdStatus: status, spStatus: status })
      .pipe(take(1))
      .subscribe(referral => {
        const index = this.referrals.findIndex(r => r.referralId === referral.referralId);
        this.referrals[index].status = referral.status;
      });
  }

  onFileSelect($event): void {
    this.uploadingDocuments = true;
    const files = $event.target.files;
    const formData = new FormData();
    for (let x = 0, l = files.length; x < l; x++) {
      formData.append(`File${x}`, files[x]);
    }

    this.referralService.uploadDocuments(this.referral.referralId, formData)
      .pipe(take(1))
      .subscribe(referral => {
        this.uploadingDocuments = false;
        const referralIndex = this.referrals.findIndex(r => r.referralId === referral.referralId);
        this.referrals[referralIndex] = referral;
        this.enterComment('Uploaded document(s)');
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
  }

  enterComment(text: string): void {
    const message: Message = {
      text,
      userId: this.user.email,
      channel: this.selectedChannel,
      timeStamp: Date.now()
    };
    this.messages.push(message);
    const index = this.messages.length - 1;
    this.referralService.createMessage(this.referral.referralId, [message])
      .pipe(take(1))
      .subscribe(mes => this.messages[index] = mes);
    this.messageToSend = '';
  }

  private watchMessages(): void {
    this.triggerMessage.pipe(
      filter(() => !!this.referral),
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
