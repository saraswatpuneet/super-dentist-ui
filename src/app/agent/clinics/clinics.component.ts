import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { filter, map, takeUntil } from 'rxjs/operators';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService
  ) { super(); }

  ngOnInit(): void {
    this.getClinics();
  }

  ngAfterViewInit(): void {
  }

  getPatients(clinic: any): void {
    this.router.navigate([`agent/clinics/${clinic.addressId}/patients`]);
  }

  private getClinics(): void {
    this.clinicService.getAllClinics().pipe(
      filter(r => !!r),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinics => {
      this.clinics = clinics;
    });
  }
}
