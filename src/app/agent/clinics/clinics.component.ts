import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter, map, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss']
})
export class ClinicsComponent extends Base implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['clinicName', 'address', 'phoneNumber'];
  clinics = [];
  pageSize = 20;
  cursorNext = '';
  cursor = '';
  cursorPrev = '';
  loading = false;
  private triggerPageChange = new Subject<void>();

  constructor(
    private router: Router,
    private clinicService: ClinicService
  ) { super(); }

  ngOnInit(): void {
    this.watchClinics();
    this.changePageSize();
  }

  ngAfterViewInit(): void {
  }

  getPatients(clinic: any): void {
    this.router.navigate([`agent/clinics/${clinic.addressId}/patients`]);
  }

  changePageSize(): void {
    this.cursor = undefined;
    this.triggerPageChange.next();
  }

  back(): void {
    this.cursor = this.cursorPrev;
    this.triggerPageChange.next();
  }

  forward(): void {
    this.cursor = this.cursorNext;
    this.triggerPageChange.next();
  }

  private watchClinics(): void {
    this.triggerPageChange.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.clinicService.getAllClinics(this.pageSize, this.cursor)),
      tap(() => this.loading = false),
      filter(r => !!r),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.clinics = r.clinics;
      this.cursorNext = r.cursorNext;
      this.cursorPrev = r.cursorPrev;
    });
  }
}
