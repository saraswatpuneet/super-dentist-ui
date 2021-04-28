import { Component, OnInit } from '@angular/core';
import { take, map, switchMap, takeUntil, catchError, tap } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';
import { InsuranceService } from '../shared/services/insurance.service';
import { DentalBreakDowns, months } from '../shared/services/insurance';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  showInsurance = false;
  notes = {};
  clinics: any[];
  addressId = '';
  patientFilter = '';
  filteredPatients = [];
  patientColumns: string[] = ['name', 'dentalInsurance', 'medicalInsurance', 'status'];
  codeHistory: {};
  selectedPatient = undefined;
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  allCodes: DentalBreakDowns;
  dentalCompanies = [];
  months = months();
  private triggerPatients = new Subject();
  private triggerGetPatientCodes = new Subject();
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
  ) { super(); }

  ngOnInit(): void {
    this.insuranceService.getDentalInsurance().pipe(
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(r => {
        this.dentalCompanies = r;
      });
    this.watchPatients();
    this.getClinicCodes();
    this.watchTriggerPatientGet();
    this.triggerPatients.next();
  }

  onCancelRegistration(): void {
    this.showInsurance = false;
    this.triggerPatients.next();
  }

  selectPatient(patient: any, addressId: string): void {
    this.selectedPatient = patient;
    this.addressId = addressId;
    this.triggerGetPatientCodes.next();
  }

  filterPatientList(): void {
    this.patients.forEach((group, index) => {
      this.filteredPatients[index] = group.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
      );
    });
  }

  sortBy(group: string, order: string): void {
    console.log(group, order);
    if (group === 'patient') {
      this.sortPatientOrder(order);
    } else if (group === 'status') {
      this.sortPatientStatus(order);
    }
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

  private watchTriggerPatientGet(): void {
    this.triggerGetPatientCodes.pipe(
      switchMap(() => {
        return forkJoin([this.patientService.getPatientNotes(this.selectedPatient.patientId).pipe(
          map(r => JSON.parse(r.data)),
          catchError(() => of({}))
        ),
        this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([res, history]) => {
      this.notes = res;
      this.codeHistory = history;
    });
  }

  private watchPatients(): void {
    this.triggerPatients.pipe(
      switchMap(() => this.clinicService.getClinics()),
      map(res => res.data.clinicDetails),
      switchMap(clinics => {
        this.clinics = clinics;
        return forkJoin(this.clinics.map(clinic =>
          this.patientService.getAllPatientsForClinic(clinic.addressId).pipe(map(p => p.data), take(1)),
        ));
      }),
      tap(res => {
        this.patients = res;
        this.patients.forEach(group => group.sort((a, b) => b.createdOn - a.createdOn));
        this.filterPatientList();
      }),
      switchMap(() => this.insuranceService.getPracticeCodes()),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      this.allCodes = res;
    });
  }

  private getClinicCodes(): void {
    this.clinicService.getClinics()
      .pipe(
        map(res => res.data.clinicDetails),
        switchMap(clinics => {

          return forkJoin([
            this.clinicService.getSelectedPracticeCodes(clinics[0].addressId).pipe(map(r => r.data), take(1)),
            this.insuranceService.getPracticeCodes().pipe(take(1))
          ]);
        }),
        map(res => this.mapToCodes(res)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(codes => this.savedCodes = codes);
  }

  private mapToCodes([clinicCodes, insuranceCodes]): any {
    const savedCodes = this.newSavedCodes();
    savedCodes.label = 'Categories';
    savedCodes.key = 'categories';
    savedCodes.breakDownKeys = [];
    clinicCodes.forEach(group => {
      const groupId = group.groupId;
      savedCodes.breakDownKeys.push(groupId);
      const breakDowns = {};
      group.codeIds.forEach(id => breakDowns[id] = insuranceCodes.breakDowns[groupId].breakDowns[id]);
      savedCodes.breakDowns[groupId] = {
        key: groupId,
        label: insuranceCodes.breakDowns[groupId].label,
        breakDownKeys: group.codeIds,
        breakDowns,
      };
    });

    return savedCodes;
  }

  private newSavedCodes(): DentalBreakDowns {
    return {
      key: '',
      label: '',
      breakDownKeys: [],
      breakDowns: {}
    };
  }
}
