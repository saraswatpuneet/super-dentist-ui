import { Component, OnInit } from '@angular/core';
import { Subject, of } from 'rxjs';
import { tap, switchMap, filter, map, takeUntil, take, debounceTime, catchError } from 'rxjs/operators';
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
  loading = false;

  statistics: any = {};
  startDate = moment();
  endDate = moment();
  selectedClinic: any;

  searchClinic = '';

  private statusTrigger = new Subject<void>();
  triggerPageChange = new Subject<void>();

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
  }

  checkStatus(): void {
    this.statusTrigger.next();
  }

  selectClinic(clinic: any): void {
    this.selectedClinic = clinic;
    this.searchClinic = '';
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
      debounceTime(300),
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.searchClinic(this.searchClinic).pipe(catchError(() => {
        this.clinics = [];
        return of(null);
      }))),
      tap(() => this.loading = false),
      filter(r => !!r),
      map(r => r.data.clinicDetails),
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.clinics = r;
    });
  }

  private watchStatus(): void {
    this.statusTrigger.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.patientService.getStatistics(this.selectedClinic.addressId, this.startDate.valueOf(), this.endDate.valueOf())),
      map(d => d.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.statistics = res;
      this.loading = false;
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
