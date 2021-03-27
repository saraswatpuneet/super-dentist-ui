import { Component, OnInit } from '@angular/core';
import { take, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';
import { InsuranceService } from '../shared/services/insurance.service';
import { DentalBreakDowns } from '../shared/services/insurance';

@Component({
  selector: 'app-eligibility-benefits',
  templateUrl: './eligibility-benefits.component.html',
  styleUrls: ['./eligibility-benefits.component.scss']
})
export class EligibilityBenefitsComponent extends Base implements OnInit {
  showInsurance = false;
  clinics: any[];
  patientFilter = '';
  filteredPatients = [];
  selectedPatient: undefined;
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  months = [
    { label: 'January', value: '1', },
    { label: 'Febuary', value: '2', },
    { label: 'March', value: '3', },
    { label: 'April', value: '4', },
    { label: 'May', value: '5', },
    { label: 'June', value: '6', },
    { label: 'July', value: '7', },
    { label: 'August', value: '8', },
    { label: 'September', value: '9', },
    { label: 'October', value: '10', },
    { label: 'November', value: '11', },
    { label: 'December', value: '12', },
  ];
  private triggerPatients = new Subject();
  private triggerCodes = new Subject();
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService
  ) { super(); }

  ngOnInit(): void {
    this.watchPatients();
    this.getClinicCodes();
    this.triggerPatients.next();
  }

  onCancelRegistration(): void {
    this.showInsurance = false;
    this.triggerPatients.next();
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
  }

  filterPatientList(): void {
    this.patients.forEach((group, index) => {
      this.filteredPatients[index] = group.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
      );
    });
  }

  private watchPatients(): void {
    this.triggerPatients.pipe(
      switchMap(() => this.clinicService.getClinics()),
      map(res => res.data.clinicDetails),
      switchMap(clinics => {
        this.clinics = clinics;
        return forkJoin(this.clinics.map(clinic =>
          this.patientService.getAllPatientsForClinic(clinic.addressId).pipe(map(p => p.data), take(1))
        ));
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.patients = res;
      this.patients.forEach(group => group.sort((a, b) => b.createdOn - a.createdOn));
      this.filterPatientList();
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
      .subscribe(console.log);
  }

  private mapToCodes([clinicCodes, insuranceCodes]): any {
    console.log(insuranceCodes);
    this.savedCodes = this.newSavedCodes();
    this.savedCodes.label = 'Categories';
    this.savedCodes.key = 'categories';
    this.savedCodes.breakDownKeys = [];
    clinicCodes.forEach(group => {
      const groupId = group.groupId;
      this.savedCodes.breakDownKeys.push(groupId);
      console.log(group);
      const breakDowns = {};
      group.codeIds.forEach(id => breakDowns[id] = insuranceCodes.breakDowns[groupId].breakDowns[id]);
      this.savedCodes.breakDowns[groupId] = {
        key: groupId,
        label: insuranceCodes.breakDowns[groupId].label,
        breakDownKeys: group.codeIds,
        breakDowns,
      };

    });

    return this.savedCodes;
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
