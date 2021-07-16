import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, switchMap, filter, map, takeUntil, take } from 'rxjs/operators';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent extends Base implements OnInit {
  clinics = [];
  pageSize = 100;
  cursors = [undefined];
  cursorAddress = 0;
  loading = false;

  statistics: any = {};
  startDate = moment();
  endDate = moment();
  selectedClinicAddressId = '';

  private statusTrigger = new Subject<void>();
  private triggerPageChange = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clinicService: ClinicService,
    private patientService: PatientService,
  ) { super(); }

  ngOnInit(): void {
    this.getDates();
    this.watchClinics();
    this.watchStatus();
    this.changePageSize();
  }

  checkStatus(): void {
    this.statusTrigger.next();
  }

  changePageSize(): void {
    this.cursorAddress = 0;
    this.cursors = [undefined];
    this.triggerPageChange.next();
  }

  back(): void {
    if (this.cursorAddress > 0) {
      this.cursorAddress--;
      this.triggerPageChange.next();
    }
  }

  forward(): void {
    this.cursorAddress++;
    this.triggerPageChange.next();
  }

  closeDate(): void {
    if (this.startDate && this.endDate) {
      const queryParams: any = {};
      if (this.startDate) {
        queryParams.startTime = this.startDate.valueOf();
      }

      if (this.endDate) {
        queryParams.endTime = this.endDate.valueOf();
      }

      this.mergeRouteGoTo(queryParams);
    }

    this.triggerPageChange.next();
  }

  private mergeRouteGoTo(queryParams: any): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  private watchClinics(): void {
    this.triggerPageChange.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.getAllClinics(this.pageSize, this.cursors[this.cursorAddress])),
      tap(() => this.loading = false),
      filter(r => !!r),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.clinics = r.clinics;
      if (this.cursorAddress === this.cursors.length - 1) {
        this.cursors.push(r.cursorNext);
      }
    });
  }

  private watchStatus(): void {
    this.statusTrigger.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.patientService.getStatistics(this.selectedClinicAddressId, this.startDate.valueOf(), this.endDate.valueOf())),
      map(d => d.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.statistics = res;
      this.loading = false;
      console.log(res);
    });
  }

  private getDates(): void {
    this.route.queryParams.pipe(
      take(1),
    ).subscribe(p => {
      if (!p.startTime) {
        this.startDate = moment();
      } else {
        this.startDate = moment(parseInt(p.startTime, 10));
      }

      if (!p.endTime) {
        const m = moment();
        m.add(2, 'days');
        this.endDate = m;
      } else {
        this.endDate = moment(parseInt(p.endTime, 10));
      }
    });
  }
}
