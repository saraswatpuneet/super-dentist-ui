import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter, map, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

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
  pageSize = 50;
  cursors = [undefined];
  cursorAddress = 0;
  loading = false;
  private triggerPageChange = new Subject<void>();

  constructor(
    private router: Router,
    private clinicService: ClinicService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.watchClinics();
    this.changePageSize();
    this.title.setTitle('SuperDentist - Clinics');
  }

  ngAfterViewInit(): void {
  }

  getPatients(clinic: any): void {
    this.router.navigate([`agent/clinics/${clinic.addressId}/patients`]);
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
