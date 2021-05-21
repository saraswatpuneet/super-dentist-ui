import { Component, OnInit } from '@angular/core';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';
import { InsuranceService } from '../shared/services/insurance.service';
import { months } from '../shared/services/insurance';

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
  patientColumns: string[] = ['appointment', 'patient', 'primaryInsurance', 'secondaryInsurance'];
  selectedPatient = undefined;
  dentalCompanies = [];
  months = months();
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
    private router: Router
  ) { super(); }

  ngOnInit(): void {
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

  selectPatient(patient: any): void {
    this.router.navigate([`/eligibility-benefits/${this.selectedClinic.addressId}/patients/${patient.patientId}`]);
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
      tap(() => this.loading = true),
      switchMap(() => {
        return this.patientService.getAllPatientsForClinic2(this.selectedClinic.addressId, this.pageSize, this.cursor);
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
