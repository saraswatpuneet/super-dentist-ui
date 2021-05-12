import { Component, OnInit } from '@angular/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  pageSize = 20;
  notes = {};
  clinics: any[];
  addressId = '';
  patientFilter = '';
  filteredPatients = [];
  selectedClinic: any = {};
  patientColumns: string[] = ['appointment', 'patient', 'primaryInsurance', 'secondaryInsurance', 'tertiaryInsurance'];
  codeHistory: {};
  selectedPatient = undefined;
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  allCodes: DentalBreakDowns;
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

  selectPatient(patient: any, addressId: string): void {
    this.selectedPatient = patient;
    this.addressId = addressId;
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

  // private watchTriggerPatientGet(): void {
  //   this.triggerGetPatientCodes.pipe(
  //     switchMap(() => {
  //       return forkJoin([this.patientService.getPatientNotes(this.selectedPatient.patientId).pipe(
  //         map(r => JSON.parse(r.data)),
  //         catchError(() => of({}))
  //       ),
  //       this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1))
  //       ]);
  //     }),
  //     takeUntil(this.unsubscribe$)
  //   ).subscribe(([res, history]) => {
  //     this.notes = res;
  //     this.codeHistory = history;
  //   });
  // }

  private watchPatients(): void {
    this.triggerPatients.pipe(
      switchMap(() => {
        return this.patientService.getAllPatientsForClinic2(this.selectedClinic.addressId, this.pageSize, this.cursor);
      }),
      map(p => p.data),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      this.patients = res.patients;
      this.cursorNext = res.cursorNext;
      this.cursorPrev = res.cursorPrev;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
      this.filterPatientList();
    });
  }

  // private getClinicCodes(): void {
  //   this.clinicService.getClinics()
  //     .pipe(
  //       map(res => res.data.clinicDetails),
  //       switchMap(clinics => {

  //         return forkJoin([
  //           this.clinicService.getSelectedPracticeCodes(clinics[0].addressId).pipe(map(r => r.data), take(1)),
  //           this.insuranceService.getPracticeCodes().pipe(take(1))
  //         ]);
  //       }),
  //       map(res => this.mapToCodes(res)),
  //       takeUntil(this.unsubscribe$)
  //     )
  //     .subscribe(codes => this.savedCodes = codes);
  // }

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
