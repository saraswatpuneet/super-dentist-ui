import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, map, tap, take } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { months, patientStatus, monthsHash } from 'src/app/shared/services/insurance';
import { PatientService } from 'src/app/shared/services/patient.service';
import { InsuranceService } from 'src/app/shared/services/insurance.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent extends Base implements OnInit {
  @ViewChild('picker') picker: any;
  agents = ['', 'YI/WRS', 'VR/WRS', 'KP/WRS', 'JB/WRS', 'AS/WRS', 'MG/WRS', 'HG/WRS', 'AC/WRS', 'PB/WRS', 'BG/WRS'];
  insuranceCompaniesForFilter = [];
  filteredPatients = [];
  selectedPatients = [];
  allSelectedPatients = false;
  selectedInsuranceCompanies = [];
  assigning = false;
  patientFilter = '';
  clinic: any = {};
  pageSize = 100;
  startDate = moment();
  endDate = moment();
  months = months();
  monthsHash = monthsHash();
  patientColumns: string[] = [
    'actions', 'assignedTo', 'appointment', 'lastAppointment', 'visitCount', 'patient', 'subscriber', 'memberInfo', 'insurance', 'status'
  ];
  dentalKeys = ['primaryDental', 'secondaryDental', 'tertiaryDental'];
  medicalKeys = ['primaryMedical', 'secondaryMedical', 'tertiaryMedical'];
  loading = false;
  selectedAgentFilter = '';
  status = patientStatus();
  selectedStatus = '';
  cursors = [undefined]; // The first cursor is undefined and serves as the starting point.
  cursorAddress = 0;
  providers = [];
  statusFilter = '';
  private patients = [];
  private clinicId = '';
  private patientTrigger = new Subject<string>();
  private clinicTrigger = new Subject<string>();
  private statusTrigger = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.getInsurance();
    this.watchPatients();
    this.watchClinics();
    this.checkRoute();
    this.title.setTitle('SuperDentist - Patients');
  }

  filterByStatus(status: string): void {
    this.mergeRouteGoTo({ status });
  }

  insuranceChange(): void {
  }

  removeProviders(): void {
    this.mergeRouteGoTo({ providers: undefined });
  }

  removeStatus(): void {
    this.mergeRouteGoTo({ status: undefined });
  }

  onApplyInsurance(selectedCompanies: any): void {
    const queryParams: any = {};
    queryParams.providers = JSON.stringify(selectedCompanies);
    this.mergeRouteGoTo(queryParams);
  }

  checkStatus(): void {
    this.statusTrigger.next();
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

      this.mergeRouteGoTo(queryParams);
    }
  }

  selectAllPatients(selected: boolean): void {
    this.selectedPatients = Array(this.filteredPatients.length).fill(selected);
  }

  assignPatient(): void {
    if (this.selectedPatients.some(r => r === false)) {
      this.allSelectedPatients = false;
    } else {
      this.allSelectedPatients = true;
    }
  }

  startAssignment(): void {
    this.assigning = true;
  }

  cancelAssignment(): void {
    this.assigning = false;
    this.resetSelectedPatients();
  }

  filterByAgent(agentId: string): void {
    this.mergeRouteGoTo({ agentId: agentId ? agentId : null });
  }

  saveAssignment(agentId: string): void {
    this.assigning = false;
    const patientIds = [];

    this.selectedPatients.forEach((selected: boolean, i) => {
      if (selected) {
        let insuranceId = '';
        if (this.filteredPatients[i].dentalInsurance) {
          insuranceId = this.filteredPatients[i].dentalInsurance.id;
          this.filteredPatients[i].dentalInsurance.agentId = agentId;
        } else {
          insuranceId = this.filteredPatients[i].medicalInsurance.id;
          this.filteredPatients[i].medicalInsurance.agentId = agentId;
        }
        patientIds.push({ agentId, insuranceId });
      }
    });

    if (patientIds.length > 0) {
      this.loading = true;
      this.patientService.addAgents(patientIds).pipe(
        take(1)
      ).subscribe(r => {
        this.loading = false;
      });
    }

    this.selectedPatients = [];
    this.resetSelectedPatients();
  }

  goToClinics(): void {
    this.router.navigate([`agent/clinics`]);
  }

  filterPatientList(): void {
    this.filteredPatients = this.patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
    );
    this.resetSelectedPatients();
  }

  resetSelectedPatients(): void {
    this.selectedPatients = Array(this.filteredPatients.length).fill(false);
  }

  selectPatient(patient): void {
    let formType = '';
    let insurancePath = 'dental-insurance';
    if (patient.medicalInsurance) {
      insurancePath = 'medical-insurance';
      formType = patient.medicalInsurance.id;
      // formType = this.medicalKeys[patient.medicalInsurance.index];
    } else {
      formType = patient.dentalInsurance.id;
      // formType = this.dentalKeys[patient.dentalInsurance.index];
    }

    this.router.navigate([`agent/clinics/${this.clinicId}/patients/${patient.patientId}/${insurancePath}`], {
      queryParams: { formType },
      queryParamsHandling: 'merge',
    });
  }

  changePageSize(): void {
    this.cursorAddress = 0;
    this.cursors = [undefined];
    this.patientTrigger.next(this.clinicId);
  }

  back(): void {
    if (this.cursorAddress > 0) {
      this.cursorAddress--;
      this.patientTrigger.next(this.clinicId);
    }
  }

  forward(): void {
    this.cursorAddress++;
    this.patientTrigger.next(this.clinicId);
  }

  private mergeRouteGoTo(queryParams: any): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
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

    this.route.queryParams.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(p => {
      this.selectedAgentFilter = p.agentId;

      if (p.providers) {
        this.providers = JSON.parse(p.providers);
      } else {
        this.providers = [];
      }
      if (!p.startTime) {
        this.startDate = moment();
      } else {
        this.startDate = moment(parseInt(p.startTime, 10));
      }

      this.statusFilter = p.status;

      if (!p.endTime) {
        const m = moment();
        m.add(2, 'days');
        this.endDate = m;
      } else {
        this.endDate = moment(parseInt(p.endTime, 10));
      }

      this.patientTrigger.next(this.clinicId);
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
      tap(() => this.loading = true),
      switchMap(addressId => this.patientService.getAllPatientsForClinic2(
        addressId,
        this.pageSize,
        this.cursors[this.cursorAddress],
        this.startDate.valueOf(),
        this.endDate.valueOf(),
        this.selectedAgentFilter,
        this.providers,
        this.statusFilter,
      )),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.patients = res.patients;
      if (this.cursorAddress === this.cursors.length - 1) {
        this.cursors.push(res.cursorNext);
      }
      const patients = [];
      this.patients.forEach(patient => {
        if (patient.dentalInsurance) {
          patient.dentalInsurance.forEach((p, i) => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ dentalInsurance: p, ...tmpP });
          });
        }

        if (patient.medicalInsurance) {
          patient.medicalInsurance.forEach((p, i) => {
            const tmpP = JSON.parse(JSON.stringify(patient));
            delete tmpP.dentalInsurance;
            delete tmpP.medicalInsurance;
            patients.push({ medicalInsurance: p, ...tmpP });
          });
        }
      });
      this.patients = patients;
      this.patients.sort((a, b) => a.createdOn - b.createdOn);
      this.filterPatientList();
      this.loading = false;
    });
  }

  private getInsurance(): void {
    this.insuranceService.getDentalInsurance().pipe(
      map(d => d.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.insuranceCompaniesForFilter = res);
  }
}
