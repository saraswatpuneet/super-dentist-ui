import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Subject, forkJoin, of, Observable } from 'rxjs';
import { switchMap, map, catchError, take, tap, takeUntil, filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { DentalBreakDowns, months, monthsHash } from 'src/app/shared/services/insurance';
import { Base } from 'src/app/shared/base/base-component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent extends Base implements OnInit {
  @ViewChildren('dInsEls') dInsEls: QueryList<any>;
  @ViewChildren('mInsEls') mInsEls: QueryList<any>;
  savedRecords: any = [];
  dentalRecords: any = [];
  medicalRecords: any = [];
  loading = false;
  patient: any = {};
  addressId = '';
  clinic: any = {};
  formType = '';
  codes: any;
  codesHistory: any;
  months = months();
  monthsHash = monthsHash();
  allCodes = this.newSavedCodes();
  savedHistoryCodes = [];
  codeList = [];
  dentalIndicies = {
    0: 'primaryDental',
    1: 'secondaryDental',
    2: 'tertiaryDental'
  };
  medicalIndicies = {
    0: 'primaryMedical',
    1: 'secondaryMedical',
    2: 'tertiaryMedical'
  };
  insuranceInView = 'd0';
  private triggerPatient = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clinicService: ClinicService,
    private insuranceService: InsuranceService,
    private patientService: PatientService,
    private title: Title
  ) { super(); }

  ngOnInit(): void {
    this.getClinicCodes();
    this.checkRoute();
    this.title.setTitle('SuperDentist - Patients');
  }

  goToPatientList(): void {
    this.router.navigate(['eligibility-benefits'], { queryParamsHandling: 'preserve' });
  }

  clickDentalIns(index: number): void {
    this.insuranceInView = `d${index}`;
    const item = this.dInsEls.toArray()[index];
    item.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }

  clickMedicalIns(index: number): void {
    this.insuranceInView = `m${index}`;
    const item = this.mInsEls.toArray()[index];
    item.nativeElement.scrollIntoView({
      behavior: 'smooth'
    });
  }

  private checkRoute(): void {
    this.route.parent.params.pipe(
      filter(p => !!p),
      switchMap(p => {
        this.addressId = p.clinicId;
        this.getClinicCodes();
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
        const reqs = [
          this.insuranceService.getPracticeCodes().pipe(take(1), tap(allCodes => this.allCodes = allCodes)),
          this.clinicService.getSelectedPracticeCodes(this.addressId).pipe(map(r => r.data), take(1)),
          this.clinicService.getSelectedPracticeCodesHistory(this.addressId).pipe(map(r => r.data), take(1)),
          ...this.mapPatientNotes(),
        ];
        return forkJoin(reqs);
      }),
      map(([allCodes, selectedCodeSpecific, selectedCodesHistory, ...savedRecords]) => {
        this.allCodes = allCodes;
        this.savedHistoryCodes = selectedCodesHistory;
        return [
          this.mapToCodes([allCodes, selectedCodeSpecific]),
          this.mapToCodes([allCodes, selectedCodesHistory]) as DentalBreakDowns,
          savedRecords
        ];
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(([selectedCodes, selectedCodesHistory, savedRecords]) => {
      let counter = 0;
      this.medicalRecords = [];
      this.dentalRecords = [];
      if (this.patient.dentalInsurance) {
        this.patient.dentalInsurance.forEach(() => {
          if (!savedRecords[counter]) {
            counter++;
            return;
          }
          const groupModel = this.setCodes(selectedCodes as any);
          const mapy: any = {};
          savedRecords[counter].codes.forEach((cGroup, i) => {
            const tmp = Object.keys(cGroup).filter(c => c !== 'codes')[0];
            mapy[tmp] = {
              index: i,
              key: tmp
            };
          });

          for (let x = 0, l = groupModel.length; x < l; x++) {
            const group = groupModel[x];
            const tmp = Object.keys(group).filter(c => c !== 'codes')[0];
            if (mapy[tmp]) {
              const val = savedRecords[counter].codes[mapy[tmp].index];
              const gKeys = Object.keys(group.codes);
              const codes = {};
              for (let y = 0, l2 = gKeys.length; y < l2; y++) {
                codes[gKeys[y]] = group.codes[gKeys[y]];
                if (val.codes[gKeys[y]]) {
                  codes[gKeys[y]] = val.codes[gKeys[y]];
                }
              }
              groupModel[x] = {
                [tmp]: val[tmp],
                codes
              };
            }
          }
          savedRecords[counter].codes = groupModel;

          // Adjust history
          const historyGroup: any = {};
          (selectedCodesHistory as DentalBreakDowns).breakDownKeys.forEach(k => {
            (selectedCodesHistory as DentalBreakDowns).breakDowns[k].breakDownKeys.forEach(sk => {
              historyGroup[sk] = [];
              if (savedRecords[counter].history[sk]) {
                historyGroup[sk] = savedRecords[counter].history[sk];
              }
            });
          });
          savedRecords[counter].history = historyGroup;
          this.dentalRecords.push(savedRecords[counter]);
          counter++;
        });
      }
      if (this.patient.medicalInsurance) {
        this.patient.medicalInsurance.forEach(() => {
          if (!savedRecords[counter]) {
            counter++;
            return;
          }
          const groupModel = this.setCodes(selectedCodes as any);
          const mapy: any = {};
          savedRecords[counter].codes.forEach((cGroup, i) => {
            const tmp = Object.keys(cGroup).filter(c => c !== 'codes')[0];
            mapy[tmp] = {
              index: i,
              key: tmp
            };
          });

          for (let x = 0, l = groupModel.length; x < l; x++) {
            const group = groupModel[x];
            const tmp = Object.keys(group).filter(c => c !== 'codes')[0];
            if (mapy[tmp]) {
              const val = savedRecords[counter].codes[mapy[tmp].index];
              const gKeys = Object.keys(group.codes);
              const codes = {};
              for (let y = 0, l2 = gKeys.length; y < l2; y++) {
                codes[gKeys[y]] = group.codes[gKeys[y]];
                if (val.codes[gKeys[y]]) {
                  codes[gKeys[y]] = val.codes[gKeys[y]];
                }
              }
              groupModel[x] = {
                [tmp]: val[tmp],
                codes
              };
            }
          }
          savedRecords[counter].codes = groupModel;

          this.medicalRecords.push(savedRecords[counter]);
          counter++;
        });
      }
      this.codes = selectedCodes;
      this.codesHistory = selectedCodesHistory;
      this.loading = false;
    });
  }

  private setCodes(codes: DentalBreakDowns): any[] {
    let codeList = [];
    const groupModel = [];
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
      groupModel.push({
        [k]: { fixed: null, min: null, max: null },
        codes: codeInputs
      });
    });

    return groupModel;
  }

  private mapPatientNotes(): Observable<any>[] {
    const reqs = [];
    if (this.patient.dentalInsurance) {
      this.patient.dentalInsurance.forEach((_, i) => {
        reqs.push(this.patientService.getPatientNotes(this.patient.patientId, this.dentalIndicies[i]).pipe(
          map(r => r.data),
          map(r => JSON.parse(r)),
          catchError(() => of(undefined)),
          take(1))
        );
      });
    }

    if (this.patient.medicalInsurance) {
      this.patient.medicalInsurance.forEach((_, i) => {
        reqs.push(this.patientService.getPatientNotes(this.patient.patientId, this.medicalIndicies[i]).pipe(
          map(r => r.data),
          map(r => JSON.parse(r)),
          catchError(() => of(undefined)),
          take(1))
        );
      });
    }

    return reqs;
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
}
