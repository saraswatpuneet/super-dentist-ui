import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { months } from 'src/app/shared/services/insurance';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent extends Base implements OnInit {
  filteredPatients = [];
  patientFilter = '';
  clinic: any = {};
  pageSize = 20;
  months = months();
  patientColumns: string[] = ['appointment', 'patient', 'subscriber', 'memberInfo', 'insurance', 'status'];
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

  goToClinics(): void {
    this.router.navigate([`agent/clinics`]);
  }

  filterPatientList(): void {
    this.filteredPatients = this.patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
    );
  }

  selectPatient(patient): void {
    let insurancePath = 'dental-insurance';
    if (patient.medicalInsurance) {
      insurancePath = 'medical-insurance';
    }
    this.router.navigate([`agent/clinics/${this.clinicId}/patients/${patient.patientId}/${insurancePath}`]);
  }

  private checkRoute(): void {
    this.route.parent.params.subscribe(r => {
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
      switchMap(addressId => this.patientService.getAllPatientsForClinic(addressId)),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.patients = res;
      const patients = [];
      this.patients.forEach(patient => {
        if (patient.dentalInsurance) {
          patient.dentalInsurance.forEach(i => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ dentalInsurance: i, ...tmpP });
          });
        }
        if (patient.medicalInsurance) {
          patient.medicalInsurance.forEach(i => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ medicalInsurance: i, ...tmpP });
          });
        }
      });
      this.patients = patients;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
      this.filterPatientList();
    });
  }
}
