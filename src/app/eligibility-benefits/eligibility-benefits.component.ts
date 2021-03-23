import { Component, OnInit } from '@angular/core';
import { take, map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

import { ClinicService } from '../shared/services/clinic.service';
import { PatientService } from '../shared/services/patient.service';
import { Base } from '../shared/base/base-component';

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
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService
  ) { super(); }

  ngOnInit(): void {
    this.watchPatients();
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
}
