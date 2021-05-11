import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { months, patientStatus } from 'src/app/shared/services/insurance';
import { PatientService } from 'src/app/shared/services/patient.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent extends Base implements OnInit {
  agents = ['asdf', 'qwer', 'qwe5', '1234', 'zxcv', '1pw', '23pd', '34ds', '4pdsf', 'asdcx', 'vfr', 'bgt', 'nhyt', 'mjy'];
  insuranceCompaniesForFilter = ['Cygna', 'Delta Dental', 'United Health One'];
  filteredPatients = [];
  selectedPatients = [];
  selectedInsuranceCompanies = [];
  assigning = false;
  patientFilter = '';
  clinic: any = {};
  pageSize = 20;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  months = months();
  patientColumns: string[] = ['actions', 'assignedTo', 'appointment', 'patient', 'subscriber', 'memberInfo', 'insurance', 'status'];
  dentalKeys = ['primaryDental', 'secondaryDental', 'tertiaryDental'];
  medicalKeys = ['primaryMedical', 'secondaryMedical', 'tertiaryMedical'];
  cursor = '';
  cursorPrev = '';
  cursorNext = '';
  loading = false;
  status = patientStatus();
  selectedStatus = '';

  private patients = [];
  private clinicId = '';
  private patientTrigger = new Subject<string>();
  private clinicTrigger = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientService
  ) { super(); }

  ngOnInit(): void {
    this.watchPatients();
    this.watchClinics();
    this.checkRoute();
  }

  filterByStatus(statusValue: string): void {
    console.log(statusValue);
  }

  insuranceChange(): void {
  }

  selectAllPatients(): void {
    console.log();

  }

  startAssignment(): void {
    this.assigning = true;
  }

  cancelAssignment(): void {
    this.assigning = false;
  }

  saveAssignment(agent: any): void {
    this.assigning = false;
    console.log(agent, this);
  }

  goToClinics(): void {
    this.router.navigate([`agent/clinics`]);
  }

  filterPatientList(): void {
    this.filteredPatients = this.patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
    );
    this.selectedPatients = Array(this.filteredPatients.length).fill(false);
  }

  selectPatient(patient): void {
    let formType = '';
    let insurancePath = 'dental-insurance';
    if (patient.medicalInsurance) {
      insurancePath = 'medical-insurance';
      formType = this.medicalKeys[patient.medicalInsurance.index];
    } else {
      formType = this.dentalKeys[patient.dentalInsurance.index];
    }

    this.router.navigate([`agent/clinics/${this.clinicId}/patients/${patient.patientId}/${insurancePath}`], { queryParams: { formType } });
  }

  changePageSize(): void {
    this.cursor = undefined;
    this.patientTrigger.next(this.clinicId);
  }

  back(): void {
    this.cursor = this.cursorPrev;
    this.patientTrigger.next(this.clinicId);
  }

  forward(): void {
    this.cursor = this.cursorNext;
    this.patientTrigger.next(this.clinicId);
  }

  private checkRoute(): void {
    this.route.parent.params.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(r => {
      if (r.clinicId) {
        this.clinicId = r.clinicId;
        this.patientTrigger.next(r.clinicId);
        this.clinicTrigger.next(r.clinicId);
      } else {
        this.goToClinics();
      }
    });
  }

  private watchClinics(): void {
    this.clinicTrigger.pipe(
      switchMap(addressId => this.clinicService.getClinic(addressId)),
      map(d => d.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinic => {
      this.clinic = clinic;
    });
  }

  private watchPatients(): void {
    this.patientTrigger.pipe(
      switchMap(addressId => this.patientService.getAllPatientsForClinic2(addressId, this.pageSize, this.cursor)),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.patients = res.patients;
      this.cursorNext = res.cursorNext;
      this.cursorPrev = res.cursorNext;
      const patients = [];
      this.patients.forEach(patient => {
        if (patient.dentalInsurance) {
          patient.dentalInsurance.forEach((p, i) => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            p.index = i;
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ dentalInsurance: p, ...tmpP });
          });
        }
        if (patient.medicalInsurance) {
          patient.medicalInsurance.forEach((p, i) => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            p.index = i;
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ medicalInsurance: p, ...tmpP });
          });
        }
      });
      this.patients = patients;
      this.patients.sort((a, b) => a.createdOn - b.createdOn);
      this.filterPatientList();
    });
  }
}
