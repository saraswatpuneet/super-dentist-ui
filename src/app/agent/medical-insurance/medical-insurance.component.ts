import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { takeUntil, map, switchMap, take, tap, catchError, filter } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { DentalBreakDowns, radioOptions, unitOptions, patientStatus } from 'src/app/shared/services/insurance';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent extends Base implements OnChanges, OnInit {
  patient: any;
  clinic: any;
  unitOptions = unitOptions();
  formType = '';
  selectedStatusValue: any;
  radioOptions = radioOptions();
  codeList = [];
  allCodes = this.newSavedCodes();
  increments = ['', 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  agentForm: FormGroup;
  loading = false;
  addressId = '';
  patientId = '';
  status = patientStatus();
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  private triggerPatient = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
    this.checkRoute();
  }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc.patient) {
      if (this.patient.status && this.patient.status.value) {
        this.selectedStatusValue = this.patient.status.value;
      } else {
        this.selectedStatusValue = this.status[0].value;
      }
    }
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    this.patientService.updateStatus(this.patient.patientId, status).pipe(take(1)).subscribe();
    this.patient.status = status;
    // if (status.value === 'incomplete') {
    //   setTimeout(() => {
    //     this.incompleteEl.nativeElement.scrollIntoView({
    //       behavior: 'smooth'
    //     });
    //     setTimeout(() => {
    //       try {
    //         this.incompleteEl.nativeElement.parentElement.childNodes[2].focus();
    //       } catch (e) { }
    //     }, 800);

    //   }, 100);
    // }
  }

  toPatients(): void {
    this.router.navigate([`agent/clinics/${this.addressId}/patients`]);
  }

  private checkRoute(): void {
    this.route.queryParams.pipe(take(1)).subscribe(p => {
      this.formType = p.formType;
    });

    this.route.parent.params.pipe(
      filter(p => !!p),
      switchMap(p => {
        this.addressId = p.clinicId;
        this.patientId = p.patientId;
        return forkJoin([
          this.clinicService.getClinic(p.clinicId).pipe(map(d => d.data), take(1)),
          this.patientService.getPatient(p.patientId).pipe(map(d => d.data), take(1))
        ]);
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([clinic, patient]) => {
      this.clinic = clinic;
      this.patient = patient;
      this.triggerPatient.next();
    });
  }

  private getClinicCodes(): void {
    this.triggerPatient.pipe(
      switchMap(() => {
        this.loading = true;
        return forkJoin([
          this.insuranceService.getPracticeCodes().pipe(take(1), tap(allCodes => this.allCodes = allCodes)),
          this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
          this.patientService.getPatientNotes(this.patient.patientId).pipe(map(r => r.data), catchError(() => of(undefined)), take(1))
        ]);
      }),
      map(([codes, savedCodes, savedRecords]) => [this.mapToCodes([codes, savedCodes]), savedRecords]),
      takeUntil(this.unsubscribe$)
    ).subscribe(([codes, savedRecords]) => {
      console.log(codes, savedRecords);
      this.savedCodes = codes;
      this.loading = false;
      this.agentForm.reset();
      this.initForm();

      this.setCodes('codes', codes);

      let value = savedRecords;
      try {
        value = JSON.parse(savedRecords);
      } catch (e) {
        value = null;
      }

      if (value) {
        if (value.patientCoverage.termDate) {
          value.patientCoverage.termDate = moment(value.patientCoverage.termDate).format('MM/DD/YYYY');
        }
        if (value.patientCoverage.eligibilityStartDate) {
          value.patientCoverage.eligibilityStartDate = moment(value.patientCoverage.eligibilityStartDate).format('MM/DD/YYYY');
        }

        if (value.remarks.verifiedDate) {
          value.remarks.verifiedDate = moment(value.remarks.verifiedDate).format('MM/DD/YYYY');
        }

        this.agentForm.patchValue(value);
      }
    });
  }

  private setCodes(groupName: string, codes: DentalBreakDowns): void {
    const codeForms: FormArray = this.agentForm.get(groupName) as FormArray;
    let codeList = [];
    codes.breakDownKeys.forEach(k => codeList = [...codeList, ...codes.breakDowns[k].breakDownKeys]);
    this.codeList = codeList;
    const group = {
      percent: [0],
      frequency: this.fb.group({
        numerator: [''],
        denominator: [''],
        unit: ['year'],
      }),
      ageRange: this.fb.group({
        min: [''],
        max: ['']
      }),
      medicalNecessity: ['no'],
      sharedCodes: [],
      notes: ['']
    };
    if (groupName === 'codes') {
      delete group.medicalNecessity;
    }
    codes.breakDownKeys.forEach(k => {
      const codeInputs = this.fb.group({});
      codes.breakDowns[k].breakDownKeys.forEach(sk => {
        codeInputs.addControl(sk, this.fb.group({ ...group }));
      });

      codeForms.controls.push(this.fb.group({
        [k]: this.fb.group({ fixed: [], min: [], max: [] }),
        codes: codeInputs
      }));
    });

    console.log(this);
  }

  private mapToCodes([insuranceCodes, clinicCodes]): DentalBreakDowns {
    const savedCodes = this.newSavedCodes();
    savedCodes.label = 'Categories';
    savedCodes.key = 'categories';
    savedCodes.breakDownKeys = [];

    if (!clinicCodes) {
      clinicCodes = [];
    }

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

  private initForm(): void {
    this.agentForm = this.fb.group({
      codes: this.fb.array([]),
      remarks: this.fb.group({
        insuranceRepresentativeName: [],
        callRefNumber: [],
        verifiedBy: [],
        verifiedDate: [],
      }),
    });
  }
}
