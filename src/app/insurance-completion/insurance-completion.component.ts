import { Component, OnInit } from '@angular/core';

import { InsuranceGroup, InsuranceMap, generateGroups, generateGeneralInformation, generateCategories } from './insurance-completion';
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
        console.log(clinics);
        if (clinics && clinics.length > 0) {
          this.patientSubject.next(clinics[0].addressId);
        }
      });
  }

  getPatients(addressId: string): void {
    console.log('addressId for request', addressId);
    this.patientSubject.next(addressId);
  }

  private watchPatients(): void {
    this.patientSubject.pipe(
      // distinctUntilChanged(),
      switchMap(addressId => {
        this.selectedClinicAddressId = addressId;
        return this.patientService.getAllPatientsForClinic(addressId);
      }),
      map(res => res.data),
      takeUntil(this.unsubscribe$)
    )
      .subscribe(res => {
        console.log('Patients for clinic', res);
      });
  }
}
