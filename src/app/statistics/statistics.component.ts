import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { tap, switchMap, filter, map, takeUntil } from 'rxjs/operators';

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
  private triggerPageChange = new Subject<void>();

  constructor(private clinicService: ClinicService) { super(); }

  ngOnInit(): void {
    this.watchClinics();
    this.changePageSize();
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

}
