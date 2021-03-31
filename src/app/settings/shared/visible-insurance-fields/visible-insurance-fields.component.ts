import { Component, OnInit } from '@angular/core';
import { takeUntil, map, switchMap, take, catchError } from 'rxjs/operators';
import { Subject, of, forkJoin } from 'rxjs';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { DentalBreakDowns, DentalInsuranceKeys } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-visible-insurance-fields',
  templateUrl: './visible-insurance-fields.component.html',
  styleUrls: ['./visible-insurance-fields.component.scss']
})
export class VisibleInsuranceFieldsComponent extends Base implements OnInit {
  clinics: any;
  selectedClinic: any;
  insuranceCodes: DentalBreakDowns;
  ids = {};
  historyIds = {};
  codeMap = {};
  historyCodeMap = {};
  private triggerInsurance = new Subject();

  constructor(
    private clinicService: ClinicService,
    private insuranceService: InsuranceService
  ) { super(); }

  ngOnInit(): void {
    this.watchTrigger();
    this.watchTriggerHistory();

    forkJoin([
      this.insuranceService.getPracticeCodes().pipe(take(1)),
      this.clinicService.getClinics().pipe(map(res => res.data.clinicDetails), take(1)),
    ]).pipe(takeUntil(this.unsubscribe$)).subscribe(([codes, clinics]) => {
      this.insuranceCodes = codes;
      this.clinics = clinics;
      this.selectedClinic = this.clinics[0];
      this.triggerInsurance.next();
    });
  }

  toggleBreakDown(checked: boolean, key: string, keyIndex: number, subKey: string, subKeyIndex: number): void {
    if (checked) {
      this.ids[subKey] = true;
      if (!this.codeMap[keyIndex]) {
        this.codeMap[keyIndex] = {};
      }
      this.codeMap[keyIndex][subKeyIndex] = true;
    } else {
      delete this.ids[subKey];
      delete this.codeMap[keyIndex][subKeyIndex];
      if (Object.keys(this.codeMap[keyIndex]).length === 0) {
        delete this.codeMap[keyIndex];
      }
    }
  }

  toggleBreakDownHistory(checked: boolean, key: string, keyIndex: number, subKey: string, subKeyIndex: number): void {
    if (checked) {
      this.historyIds[subKey] = true;
      if (!this.historyCodeMap[keyIndex]) {
        this.historyCodeMap[keyIndex] = {};
      }
      this.historyCodeMap[keyIndex][subKeyIndex] = true;
    } else {
      delete this.historyIds[subKey];
      delete this.historyCodeMap[keyIndex][subKeyIndex];
      if (Object.keys(this.historyCodeMap[keyIndex]).length === 0) {
        delete this.historyCodeMap[keyIndex];
      }
    }
  }

  submitCodes(): void {
    const keys: DentalInsuranceKeys[] = this.generateKeysForSubmit(this.codeMap);
    const historyKeys: DentalInsuranceKeys[] = this.generateKeysForSubmit(this.historyCodeMap);

    this.clinicService.saveSelectedPracticeCodesHistory(this.selectedClinic.addressId, historyKeys).pipe(take(1)).subscribe(console.log);
    this.clinicService.saveSelectedPracticeCodes(this.selectedClinic.addressId, keys).pipe(take(1)).subscribe(console.log);
  }

  private generateKeysForSubmit(codeMap: any): DentalInsuranceKeys[] {
    const keys: DentalInsuranceKeys[] = [];
    Object.keys(codeMap).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).forEach(groupIndex => {
      keys.push({
        groupId: this.insuranceCodes.breakDownKeys[groupIndex],
        codeIds: Object.keys(codeMap[groupIndex])
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
          .map(codeIndex =>
            this.insuranceCodes.breakDowns[this.insuranceCodes.breakDownKeys[groupIndex]].breakDownKeys[codeIndex]
          )
      });
    });

    return keys;
  }

  private watchTriggerHistory(): void {
    this.triggerInsurance.pipe(
      switchMap(() =>
        this.clinicService.getSelectedPracticeCodesHistory(this.selectedClinic.addressId)
          .pipe(map(r => r.data), catchError(() => of([])))
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (!res) {
        res = [];
      }
      res.forEach(group => {
        const groupIndex = this.insuranceCodes.breakDownKeys.indexOf(group.groupId);
        this.historyCodeMap[groupIndex] = {};
        group.codeIds.forEach(id => {
          this.historyIds[id] = true;
          this.historyCodeMap[groupIndex][this.insuranceCodes.breakDowns[group.groupId].breakDownKeys.indexOf(id)] = true;
        });
      });
    });
  }

  private watchTrigger(): void {
    this.triggerInsurance.pipe(
      switchMap(() =>
        this.clinicService.getSelectedPracticeCodes(this.selectedClinic.addressId)
          .pipe(map(r => r.data), catchError(() => of([])))
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
      if (!res) {
        res = [];
      }
      res.forEach(group => {
        const groupIndex = this.insuranceCodes.breakDownKeys.indexOf(group.groupId);
        this.codeMap[groupIndex] = {};
        group.codeIds.forEach(id => {
          this.ids[id] = true;
          this.codeMap[groupIndex][this.insuranceCodes.breakDowns[group.groupId].breakDownKeys.indexOf(id)] = true;
        });
      });
    });
  }
}
