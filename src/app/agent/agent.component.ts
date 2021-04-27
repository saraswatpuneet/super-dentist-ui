import { Component, OnInit } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';

import { Base } from '../shared/base/base-component';
import { ClinicService } from '../shared/services/clinic.service';
import { InsuranceService } from '../shared/services/insurance.service';
import { PatientService } from '../shared/services/patient.service';
import { DentalBreakDowns } from '../shared/services/insurance';
import { takeUntil, map, take, switchMap, tap, filter } from 'rxjs/operators';

// Status for insurance

// Pending
// Active
// Inactive
// Termed - with a date
// Incomplete information - Should have a list of wrong fields, updates user. Can type message for now
// Discount plan
// Medicare plan
//

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent extends Base implements OnInit {
  addressId = '';
  displayedColumns: string[] = ['clinicName', 'address', 'phoneNumber'];
  patientColumns: string[] = ['name', 'birthday', 'dentalInsurance', 'medicalInsurance', 'status'];
  showInsurance = false;
  patientFilter = '';
  selectedClinic: any;
  clinics: any[] = [];
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
  private patientTrigger = new Subject<string>();
  private patients = [];

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService,
  ) { super(); }

  ngOnInit(): void {
    this.clinicService.getAllClinics().pipe(
      filter(r => !!r),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinics => {
      this.clinics = clinics;
    });

    this.watchPatients();
    this.getClinicCodes();
    this.triggerPatients.next();
  }

  getPatients(clinic: any): void {
    this.selectedClinic = clinic;
    this.patients = undefined;
    this.selectedPatient = undefined;
    this.patientTrigger.next(this.selectedClinic.addressId);
  }

  clearAll(): void {
    this.selectedPatient = undefined;
    this.patients = undefined;
    this.selectedClinic = undefined;
  }

  onCancelRegistration(): void {
    this.showInsurance = false;
    this.triggerPatients.next();
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
    this.addressId = this.selectedClinic.addressId;
  }

  filterPatientList(): void {
    this.filteredPatients = this.patients.filter(patient =>
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.patientFilter.toLowerCase())
    );
  }

  private watchPatients(): void {
    this.patientTrigger.pipe(
      switchMap(addressId => this.patientService.getAllPatientsForClinic(addressId)),
      map(r => r.data),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.patients = res;
      this.patients.sort((a, b) => b.createdOn - a.createdOn);
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
