import { Component, OnInit } from '@angular/core';
import { map, switchMap, takeUntil, tap, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';
import { InsuranceService } from '../shared/services/insurance.service';
import { months, monthsHash } from '../shared/services/insurance';
import * as moment from 'moment';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  showInsurance = false;
  pageSize = 20;
  clinics: any[];
  addressId = '';
  patientFilter = '';
  filteredPatients = [];
  selectedClinic: any = {};
  patientColumns: string[] = ['patient', 'appointment', 'insurance', 'status'];
  selectedPatient = undefined;
  dentalCompanies = [];
  startDate = moment();
  endDate = moment();
  months = monthsHash();
  cursor = '';
  cursorPrev = '';
  cursorNext = '';
  clinicId = '';
  loading = false;
  private triggerPatients = new Subject();
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private router: Router,
    private route: ActivatedRoute,
  ) { super(); }

  ngOnInit(): void {
    this.checkRoute();
    this.closeDate();

    this.insuranceService.getDentalInsurance().pipe(
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.dentalCompanies = r;
    });

    this.watchPatients();

    this.clinicService.getClinics().pipe(
      map(r => r.data.clinicDetails),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinics => {
      this.clinics = clinics;
      this.selectedClinic = this.clinics[0];
      this.triggerPatients.next();
    });
  }

  onCancelRegistration(): void {
    this.showInsurance = false;
    this.triggerPatients.next();
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

      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams,
          queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }
  }

  selectPatient(patient: any): void {
    this.router.navigate([`/eligibility-benefits/${this.selectedClinic.addressId}/patients/${patient.patientId}`], {
      queryParamsHandling: 'preserve'
    });
  }

  filterPatientList(): void {
    this.filteredPatients = this.patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
    );
  }

  sortBy(group: string, order: string): void {
    if (group === 'patient') {
      this.sortPatientOrder(order);
    } else if (group === 'status') {
      this.sortPatientStatus(order);
    }
  }

  onChangeClinic(clinic: any): void {
    this.selectedClinic = clinic;
    this.triggerPatients.next();
  }

  changePageSize(): void {
    this.cursor = undefined;
    this.triggerPatients.next();
  }

  back(): void {
    this.cursor = this.cursorPrev;
    this.triggerPatients.next();
  }

  forward(): void {
    this.cursor = this.cursorNext;
    this.triggerPatients.next();
  }

  private checkRoute(): void {
    this.route.queryParams.pipe(
      takeUntil(this.unsubscribe$)
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

      this.triggerPatients.next();
    });

  }

  private sortPatientStatus(order: string): void {
    this.clinics.forEach((_, i) => {
      this.filteredPatients[i] = this.filteredPatients[i].sort((a, b) => {
        if (a.status.value !== order) {
          return -1;
        }
        if (b.status.value === order) {
          return 1;
        }
        return 0;
      });
    });
  }

  private sortPatientOrder(order: string): void {
    if (order === 'az') {
      this.clinics.forEach((_, i) => {
        this.filteredPatients[i] = this.filteredPatients[i].sort((a, b) => {
          const name = `${a.firstName} ${a.lastName}`;
          const name2 = `${b.firstName} ${b.lastName}`;
          if (name < name2) {
            return -1;
          }
          if (name > name2) {
            return 1;
          }
          return 0;
        });
      });
    } else {
      this.clinics.forEach((_, i) => {
        this.filteredPatients[i] = this.filteredPatients[i].sort((b, a) => {
          const name = `${a.firstName} ${a.lastName}`;
          const name2 = `${b.firstName} ${b.lastName}`;
          if (name < name2) {
            return -1;
          }
          if (name > name2) {
            return 1;
          }
          return 0;
        });
      });
    }
  }

  private watchPatients(): void {
    this.triggerPatients.pipe(
      filter(() => !!this.selectedClinic),
      tap(() => this.loading = true),
      switchMap(() => {
        return this.patientService.getAllPatientsForClinic2(
          this.selectedClinic.addressId,
          this.pageSize,
          this.cursor,
          this.startDate.valueOf(),
          this.endDate ? this.endDate.valueOf() : this.startDate.valueOf()
        );
      }),
      map(p => p.data),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      this.loading = false;
      this.patients = res.patients;
      this.cursorNext = res.cursorNext;
      this.cursorPrev = res.cursorPrev;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
      this.filterPatientList();
    });
  }
}
