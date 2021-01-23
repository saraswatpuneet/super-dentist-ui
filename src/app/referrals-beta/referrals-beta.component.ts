import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, take, takeUntil, map } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { Channel, ClinicStatus, Message, Referral, referredStatus, sortReferredStatus } from '../shared/services/referral';
import { ReferralService } from '../shared/services/referral.service';
import { SelectionModel } from '@angular/cdk/collections';
import { referralsBetaAnimations } from './referrals-beta.animations';

@Component({
  selector: 'app-referrals-beta',
  templateUrl: './referrals-beta.component.html',
  styleUrls: ['./referrals-beta.component.scss'],
  animations: referralsBetaAnimations
})
export class ReferralsBetaComponent extends Base implements OnInit {
  files: any;
  clinicReferrals: any[] = [];
  referrals: Referral[] = [];
  filteredReferrals: Referral[] = [];
  referralColumns: string[] = ['dateReferred', 'patientName', 'referringClinic', 'actions'];
  selection = new SelectionModel<any>(true, []);
  messageToSend = '';
  messages: Message[];
  tabIndex = 0;
  clinicType = '';
  selectedChannel: Channel = 'c2c';
  user: firebase.default.User;
  referral: Referral;
  uploadingDocuments = false;
  referredStatuses = referredStatus();
  referralId = '';
  sortedStatuses = sortReferredStatus();
  showSummary = false;
  private addId = '';
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
    this.clinicService.getClinics().pipe(map(d => d.data.clinicDetails), takeUntil(this.unsubscribe$)).subscribe(clinics => {
      this.clinicReferrals = [];

      if (clinics.length === 1 && clinics[0].type === 'dentist') {
        this.addId = clinics[0].addressId;
        this.clinicType = 'dentist';
        this.referralColumns = ['dateReferred', 'patientName', 'referringClinic', 'status', 'actions'];
        this.referralService.getDentistRerrals(this.addId).pipe(
          catchError(() => of([])),
          take(1)
        )
          .subscribe(res => {
            this.referrals = res;
            const referrals = [
              this.getFilteredReferrals(res as Referral[], 0),
              this.getFilteredReferrals(res as Referral[], 1),
              this.getFilteredReferrals(res as Referral[], 2)
            ];
            this.clinicReferrals = [{ clinicName: clinics[0].name, referrals }];
          });
      } else {
        this.clinicType = 'specialist';
        this.referralColumns = ['select', 'dateReferred', 'patientName', 'referringClinic', 'actions'];
        const reqs = [];
        clinics.forEach(clinic => {
          reqs.push(this.referralService.getSpecialistReferrals(clinic.addressId).pipe(catchError(() => of([])), take(1)));
        });
        forkJoin(reqs).pipe(take(1))
          .subscribe(res => {
            for (let x = 0, l = clinics.length; x < l; x++) {
              const referrals = [
                this.getFilteredReferrals(res[x] as Referral[], 0),
                this.getFilteredReferrals(res[x] as Referral[], 1),
                this.getFilteredReferrals(res[x] as Referral[], 2)
              ];
              this.clinicReferrals.push({ clinicName: clinics[x].name, referrals });
            }
            console.log(this.clinicReferrals);
          });
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

  markStatus(status: ClinicStatus): void {
    const rids = this.selection.selected.map(r => r.referralId);
    this.updateStatus(rids, status);
  }

  markStatusDentist(rid: string, status: ClinicStatus): void {
    this.updateStatus([rid], status);
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
      this.filteredReferrals.forEach(row => this.selection.select(row));
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
    this.setFilteredReferrals(this.referrals, tabIndex);
  }

  getFilteredReferrals(referrals: Referral[], tabIndex: number): any {
    let validStates = [];
    if (tabIndex === 0) {
      validStates = [this.sortedStatuses[0]];
    } else if (tabIndex === 1) {
      validStates = [this.sortedStatuses[1]];
    } else {
      validStates = [this.sortedStatuses[2], this.sortedStatuses[4]];
    }

    return referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    });

  }

  setFilteredReferrals(referrals: Referral[], tabIndex: number): void {
    let validStates = [];
    if (tabIndex === 0) {
      validStates = [this.sortedStatuses[0]];
    } else if (tabIndex === 1) {
      validStates = [this.sortedStatuses[1]];
    } else {
      validStates = [this.sortedStatuses[2], this.sortedStatuses[4]];
    }

    this.filteredReferrals = referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    });
  }

  filterDentistReferrals(tabIndex: number): void {
    this.selection.clear();
    this.setFilteredDentistReferrals(this.referrals, tabIndex);
  }

  getFilteredDentistReferrals(referrals: Referral[], tabIndex: number): any {
    let validStates = [];
    if (tabIndex === 0) {
      validStates = [this.sortedStatuses[0], this.sortedStatuses[1], this.sortedStatuses[2]];
    } else {
      validStates = [this.sortedStatuses[4]];
    }

    return referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    });
  }
  setFilteredDentistReferrals(referrals: Referral[], tabIndex: number): void {
    let validStates = [];
    if (tabIndex === 0) {
      validStates = [this.sortedStatuses[0], this.sortedStatuses[1], this.sortedStatuses[2]];
    } else {
      validStates = [this.sortedStatuses[4]];
    }

    this.filteredReferrals = referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    });
  }

  updateStatus(referralIds: string[], status: ClinicStatus): void {
    const reqs = referralIds.map(r => this.referralService.updateStatus(r, { gdStatus: status, spStatus: status })
      .pipe(take(1)));
    forkJoin(reqs)
      .pipe(take(1))
      .subscribe(referrals => {
        referrals.forEach(referral => {
          const index = this.referrals.findIndex(r => r.referralId === referral.referralId);
          this.referrals[index].status = referral.status;
          if (this.clinicType === 'specialist') {
            this.filterReferrals(this.tabIndex);
          } else {
            this.filterDentistReferrals(this.tabIndex);
          }
        });
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

  referralChat(referralId: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: referralId
      },
      queryParamsHandling: 'merge'
    });
  }

  referralSummary(referralId: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        s: referralId,
      },
      queryParamsHandling: 'merge'
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
      filter(params => {
        this.referralId = params.r;
        this.showSummary = false;

        if (params.s) {
          this.showSummary = true;
        }
        return !!params.r;
      }),
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
