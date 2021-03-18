import { Component, OnInit } from '@angular/core';

import { InsuranceGroup, generateGroups } from './insurance-completion';
import { Subject } from 'rxjs';
import { Base } from '../shared/base/base-component';
import { PatientService } from '../shared/services/patient.service';
import { ClinicService } from '../shared/services/clinic.service';
import { filter, map, takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-insurance-completion',
  templateUrl: './insurance-completion.component.html',
  styleUrls: ['./insurance-completion.component.scss']
})
export class InsuranceCompletionComponent extends Base implements OnInit {
  groups: InsuranceGroup[] = [];
  clinics = [];
  selectedClinicAddressId = '';
  selectedClinic: any;
  selectedPatient: any;
  patients = [];

  private patientSubject = new Subject<string>();

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
  ) { super(); }

  ngOnInit(): void {
    this.groups = generateGroups();
    this.watchPatients();
    this.clinicService.getAllClinics()
      .pipe(
        filter(r => !!r),
        map(res => res.data),
        takeUntil(this.unsubscribe$))
      .subscribe(clinics => {
        this.clinics = clinics;
      });
  }

  getPatients(clinic: any): void {
    this.selectedClinic = clinic;
    this.patients = undefined;
    this.selectedPatient = undefined;
    this.patientSubject.next(this.selectedClinic.addressId);
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
  }

  private watchPatients(): void {
    this.patientSubject.pipe(
      switchMap(addressId => this.patientService.getAllPatientsForClinic(addressId)),
      map(res => res.data),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(res => {
        this.patients = res;
      });
  }
}
