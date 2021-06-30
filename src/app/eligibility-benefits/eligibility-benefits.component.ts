import { Component, OnInit } from '@angular/core';
import { map, switchMap, takeUntil, tap, filter, debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';
import { InsuranceService } from '../shared/services/insurance.service';
import { monthsHash } from '../shared/services/insurance';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  showInsurance = false;
  pageSize = 50;
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
  cursors = [undefined];
  cursorAddress = 0;
  clinicId = '';
  loading = false;
  private triggerSearchPatientName = new Subject();
  private triggerPatients = new Subject();
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.title.setTitle('SuperDentist - Eligibility & Benefits');
    this.checkRoute();
    this.closeDate();

    this.insuranceService.getDentalInsurance().pipe(
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      this.dentalCompanies = r;
    });

    this.watchPatients();
    this.watchSearch();

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

      this.cursorAddress = 0;
      this.cursors = [undefined];

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
    this.triggerSearchPatientName.next();
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
    this.cursorAddress = 0;
    this.cursors = [undefined];
    this.triggerPatients.next();
  }

  back(): void {
    if (this.cursorAddress > 0) {
      this.cursorAddress--;
      this.triggerPatients.next();
    }
  }

  forward(): void {
    this.cursorAddress++;
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
        this.patientFilter = '';
        return this.patientService.getAllPatientsForClinic2(
          this.selectedClinic.addressId,
          this.pageSize,
          this.cursors[this.cursorAddress],
          this.startDate.valueOf(),
          this.endDate ? this.endDate.valueOf() : this.startDate.valueOf()
        );
      }),
      map(p => p.data),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (this.cursorAddress === this.cursors.length - 1) {
        this.cursors.push(res.cursorNext);
      }

      this.loading = false;
      this.patients = res.patients;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
      this.filteredPatients = this.patients;
    });
  }

  private watchSearch(): void {
    this.triggerSearchPatientName.pipe(
      tap(() => this.loading = true),
      debounceTime(300),
      filter(res => {
        if (!this.patientFilter) {
          this.triggerPatients.next();
        }
        return !!this.patientFilter;
      }),
      switchMap(() => this.patientService.searchByPatientName(this.selectedClinic.addressId, this.patientFilter)),
      map(res => res.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(patients => {
      this.patients = patients;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
      this.filteredPatients = this.patients;
      this.loading = false;
    });
  }
}
