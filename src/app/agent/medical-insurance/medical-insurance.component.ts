import { Component, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, map, switchMap, take, tap, catchError, filter } from 'rxjs/operators';
import { forkJoin, of, Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { DentalBreakDowns, radioOptions, unitOptions, patientStatus, months } from 'src/app/shared/services/insurance';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-medical-insurance',
  templateUrl: './medical-insurance.component.html',
  styleUrls: ['./medical-insurance.component.scss']
})
export class MedicalInsuranceComponent extends Base implements OnChanges, OnInit {
  @ViewChild('incompleteNotesEl') incompleteEl: ElementRef;
  patient: any = {};
  clinic: any = {}
  insuranceIndex = 0;;
  medicalIndex = {
    primaryMedical: 0,
    secondaryMedical: 1,
    tertiaryMedical: 2
  };
  unitOptions = unitOptions();
  formType = '';
  groupModel = [];
  processing = false;
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
  months = months();
  savedCodes: DentalBreakDowns = this.newSavedCodes();
  private triggerPatient = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.getClinicCodes();
    this.checkRoute();
    this.title.setTitle('SuperDentist - Medical Insurance');
  }

  ngOnChanges(sc: SimpleChanges): void {
    if (this.formType) {
      this.selectedStatusValue = this.patient.medicalInsurance[this.insuranceIndex].status.value;
    }
  }

  onSave(): void {
    const value = JSON.parse(JSON.stringify({
      ...this.agentForm.value,
      ...{ codes: this.groupModel },
    }));

    this.processing = true;
    this.patientService.setPatientNotes(this.patient.patientId, value, this.formType)
      .pipe(take(1))
      .subscribe(res => this.processing = false);
  }

  updateStatus(): void {
    const status = this.status.find((s) => s.value === this.selectedStatusValue);
    const insurance = this.patient.medicalInsurance[this.insuranceIndex];

    this.patientService.updateStatus(this.patient.patientId, status, insurance.id).pipe(take(1)).subscribe();
    this.patient.status = status;

    if (status.value === 'incomplete' || status.value === 'needAssistance') {
      setTimeout(() => {
        this.incompleteEl.nativeElement.scrollIntoView({
          behavior: 'smooth'
        });
        setTimeout(() => {
          try {
            this.incompleteEl.nativeElement.parentElement.childNodes[2].focus();
          } catch (e) { }
        }, 800);
      }, 100);
    }
  }

  toPatients(): void {
    this.router.navigate([`agent/clinics/${this.addressId}/patients`], {
      queryParamsHandling: 'preserve',
    });
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
      try {
        for (let x = 0, l = patient.medicalInsurance.length; x < l; x++) {
          if (patient.medicalInsurance[x].id === this.formType) {
            this.insuranceIndex = x;
            break;
          }
        }
      } catch (e) {
      }
      if (this.formType) {
        this.selectedStatusValue = this.patient.medicalInsurance[this.insuranceIndex].status.value;
      }
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
          this.patientService.getPatientNotes(this.patient.patientId, this.formType)
            .pipe(map(r => r.data), catchError(() => of(undefined)), take(1))
        ]);
      }),
      map(([codes, savedCodes, savedRecords]) => [this.mapToCodes([codes, savedCodes]), savedRecords]),
      takeUntil(this.unsubscribe$)
    ).subscribe(([codes, savedRecords]) => {
      this.savedCodes = codes;
      this.loading = false;
      this.agentForm.reset();
      this.initForm();

      this.setCodes(codes);

      let value = savedRecords;
      try {
        value = JSON.parse(savedRecords);
      } catch (e) {
        value = null;
      }

      if (value) {

        if (value.remarks && value.remarks.verifiedDate) {
          value.remarks.verifiedDate = value.remarks.verifiedDate.toString()
        }

        this.groupModel = value.codes;

        this.agentForm.patchValue(value);
      }
    });
  }

  private setCodes(codes: DentalBreakDowns): void {
    let codeList = [];
    this.groupModel = [];
    codes.breakDownKeys.forEach(k => codeList = [...codeList, ...codes.breakDowns[k].breakDownKeys]);
    this.codeList = codeList;

    const group = {
      percent: 0,
      frequency: {
        numerator: null,
        denominator: null,
        unit: null,
      },
      ageRange: {
        min: null,
        max: null
      },
      medicalNecessity: 'no',
      sharedCodes: [],
      notes: ''
    };

    codes.breakDownKeys.forEach(k => {
      const codeInputs = {};
      codes.breakDowns[k].breakDownKeys.forEach(sk => {
        codeInputs[sk] = JSON.parse(JSON.stringify(group));
      });
      this.groupModel.push({
        [k]: { fixed: null, min: null, max: null },
        codes: codeInputs
      });
    });
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
      patientCoverage: this.fb.group({
        needAssistance: [''],
        annualMaximum: [''],
        annualUsedAmount: [''],
        deductibleIndividual: [''],
        deductibleMetAmountIndividual: [''],
        deductibleFamily: [''],
        deductibleMetAmountFamily: [''],
        termDate: [''],
        eligibilityStartDate: ['']
      }),
      remarks: this.fb.group({
        insuranceRepresentativeName: [],
        callRefNumber: [],
        verifiedBy: [],
        verifiedDate: [],
        comments: ['']
      }),
    });
  }
}
