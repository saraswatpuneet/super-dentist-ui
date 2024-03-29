import { Component, OnInit } from '@angular/core';
import { catchError, filter, switchMap, take, takeUntil, map } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { Title } from '@angular/platform-browser';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { Channel, ClinicStatus, Message, Referral, referredStatus, sortReferredStatus } from '../shared/services/referral';
import { ReferralService } from '../shared/services/referral.service';
import { referralsAnimations } from './referrals.animations';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
  animations: referralsAnimations
})
export class ReferralsComponent extends Base implements OnInit {
  tabCounts = [undefined, undefined, undefined, undefined];
  files: any;
  patientNameSearch = '';
  clinicReferrals: any[] = [];
  filteredClinicReferrals: any[] = [];
  referralColumns: string[] = ['dateReferred', 'patientName', 'referringClinic', 'actions'];
  messageToSend = '';
  messages: Message[];
  tabIndex = 0;
  specialistTabs = [
    { value: 'referred', label: 'Referred' },
    { value: 'pending', label: 'Pending', },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
  ];
  clinicType = '';
  myClinics: any[];
  selectedChannel: Channel = 'c2c';
  user: firebase.default.User;
  referral: Referral;
  uploadingDocuments = false;
  referredStatuses = referredStatus();
  referralId = '';
  sortedStatuses = sortReferredStatus();
  showSummary = false;
  private addId = '';
  private triggerSpecialistReferrals = new Subject();
  private triggerDentistReferrals = new Subject();

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private referralService: ReferralService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.title.setTitle('SuperDentist - Referrals');
    this.auth.currentUser.then(user => this.user = user);
    this.watchDentistReferrals();
    this.watchSpecialistReferrals();
    this.watchRoute();

    this.clinicService.getClinics().pipe(
      map(d => d.data.clinicDetails),
      takeUntil(this.unsubscribe$))
      .subscribe(clinics => {
        this.myClinics = clinics;

        if (clinics.length === 1 && clinics[0].type === 'dentist') {
          this.addId = clinics[0].addressId;
          this.clinicType = 'dentist';
          this.referralColumns = ['dateReferred', 'patientName', 'referringClinic', 'status', 'actions'];
          this.triggerDentistReferrals.next();
        } else {
          this.clinicType = 'specialist';
          this.referralColumns = ['dateReferred', 'patientName', 'referringClinic', 'actions'];
          this.triggerSpecialistReferrals.next();
        }
      });
  }

  downloadFiles(referralId: string): void {
    this.referralService.getAllDocuments(referralId).pipe(take(1)).subscribe(res =>
      saveAs(new Blob([res]), 'patientDocuments.zip'));
  }

  filterPatientList($event): void {
    const clinicReferrals = JSON.parse(JSON.stringify(this.clinicReferrals));
    if ($event) {

      for (let x = 0, l = clinicReferrals.length; x < l; x++) {
        const referrals = clinicReferrals[x].referrals;
        for (let y = 0, l2 = referrals.length; y < l2; y++) {
          clinicReferrals[x].referrals[y] = referrals[y].filter(r =>
            `${r.patientFirstName} ${r.patientLastName}`.toLowerCase().includes($event.toLowerCase())
          );
        }
      }
      this.filteredClinicReferrals = clinicReferrals;
    } else {
      this.filteredClinicReferrals = clinicReferrals;
    }

    if (this.clinicType === 'specialist') {
      this.calcTabCounts(4);
    } else {
      this.calcTabCounts(2);
    }
  }

  getFilteredSpecialistReferrals(referrals: Referral[], tabIndex: number): any {
    const validStates = [this.sortedStatuses[tabIndex]];

    return referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    }).sort((a, b) => moment(b.createdOn).unix() - moment(a.createdOn).unix());
  }

  onFilesUploaded(): void {
    if (this.clinicType === 'dentist') {
      this.triggerDentistReferrals.next();
    } else {
      this.triggerSpecialistReferrals.next();
    }
  }

  getFilteredDentistReferrals(referrals: Referral[], tabIndex: number): any {
    let validStates = [];
    if (tabIndex === 0) {
      validStates = [this.sortedStatuses[0], this.sortedStatuses[1], this.sortedStatuses[2], this.sortedStatuses[3]];
    } else {
      validStates = [this.sortedStatuses[5]];
    }

    return referrals.filter(r => {
      if (!r.status) {
        return false;
      }

      if (validStates.includes(r.status.gdStatus)) {
        return true;
      }

      return false;
    }).sort((a, b) => moment(b.createdOn).unix() - moment(a.createdOn).unix());
  }

  markStatusDentist(referralIndex: number, status: ClinicStatus): void {
    const ref = this.filteredClinicReferrals[0].referrals[0].splice(referralIndex, 1)[0];
    ref.status = { gdStatus: status, spStatus: closed };
    this.filteredClinicReferrals[0].referrals[1].push(ref);
    this.filteredClinicReferrals = JSON.parse(JSON.stringify(this.filteredClinicReferrals));

    const indexToSplice = this.clinicReferrals[0].referrals[0].findIndex(r => r.referralId === ref.referralId);
    this.clinicReferrals[0].referrals[0].splice(indexToSplice, 1);
    this.clinicReferrals[0].referrals[1].push(ref);

    this.calcTabCounts(2);
    this.referralService.updateStatus(ref.referralId, { gdStatus: status, spStatus: status })
      .pipe(take(1))
      .subscribe();
  }

  onCloseChat(): void {
    this.router.navigate([], {
      relativeTo: this.route
    });
  }

  updateStatus2(clinicIndex: number, referralIndex: number, newTabIndex: number, status: ClinicStatus): void {
    let ref = this.filteredClinicReferrals[clinicIndex].referrals[this.tabIndex][referralIndex];
    if (ref.status.gdStatus === status) {
      return;
    }

    ref = this.filteredClinicReferrals[clinicIndex].referrals[this.tabIndex].splice(referralIndex, 1)[0];
    ref.status = { gdStatus: status, spStatus: status };
    this.filteredClinicReferrals[clinicIndex].referrals[newTabIndex].push(ref);
    this.filteredClinicReferrals = JSON.parse(JSON.stringify(this.filteredClinicReferrals));

    // I have to find the original index and update clinicReferrals or filtering won't work.
    // this.clinicReferrals
    const indexToSplice = this.clinicReferrals[clinicIndex].referrals[this.tabIndex].findIndex(r => r.referralId === ref.referralId);
    this.clinicReferrals[clinicIndex].referrals[this.tabIndex].splice(indexToSplice, 1);
    this.clinicReferrals[clinicIndex].referrals[newTabIndex].push(ref);

    this.filterPatientList(this.patientNameSearch);
    this.referralService.updateStatus(ref.referralId, { gdStatus: status, spStatus: status })
      .pipe(take(1))
      .subscribe();
  }

  referralChat(referralId: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        r: referralId
      },
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

  private calcTabCounts(arraySize: number): void {
    this.tabCounts = [...Array(arraySize)].map((_, i) => {
      let count = 0;
      this.filteredClinicReferrals.forEach(c => {
        count += c.referrals[i].length;
      });

      if (count > 0) {
        return count;
      } else {
        return undefined;
      }
    });
  }

  private watchDentistReferrals(): void {
    this.triggerDentistReferrals.pipe(
      switchMap(() => this.referralService.getDentistRerrals(this.addId)),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.clinicReferrals = [];
      const referrals = [
        this.getFilteredDentistReferrals(res as Referral[], 0),
        this.getFilteredDentistReferrals(res as Referral[], 1)
      ];
      this.clinicReferrals = [{ clinicName: this.myClinics[0].name, clinicAddress: this.myClinics[0].address, referrals }];
      this.filterPatientList('');
    });
  }

  private watchSpecialistReferrals(): void {
    this.triggerSpecialistReferrals.pipe(
      switchMap(() => {
        const reqs = [];
        this.myClinics.forEach(clinic => {
          reqs.push(this.referralService.getSpecialistReferrals(clinic.addressId).pipe(catchError(() => of([])), take(1)));
        });
        return forkJoin(reqs);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.clinicReferrals = [];
      for (let x = 0, l = this.myClinics.length; x < l; x++) {
        const referrals = [
          this.getFilteredSpecialistReferrals(res[x] as Referral[], 0),
          this.getFilteredSpecialistReferrals(res[x] as Referral[], 1),
          this.getFilteredSpecialistReferrals(res[x] as Referral[], 2),
          this.getFilteredSpecialistReferrals(res[x] as Referral[], 3)
        ];
        this.clinicReferrals.push({
          clinicName: this.myClinics[x].name,
          clinicCity: this.myClinics[x].address.split(','),
          referrals
        });
      }
      this.filterPatientList('');
    });
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
