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
  private triggerInsurance = new Subject();
  codeMap = {};

  constructor(
    private clinicService: ClinicService,
    private insuranceService: InsuranceService
  ) { super(); }

  ngOnInit(): void {
    this.watchTrigger();

    forkJoin([
      this.insuranceService.getPracticeCodes().pipe(take(1)),
      this.clinicService.getClinics().pipe(map(res => res.data.clinicDetails), take(1)),
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([codes, clinics]) => {
      this.insuranceCodes = codes;
      this.clinics = clinics;
      this.selectedClinic = this.clinics[0];
      this.triggerInsurance.next();
    });

  }

  submitCodes(): void {
    const keys: DentalInsuranceKeys[] = [];
    Object.keys(this.codeMap).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)).forEach(groupIndex => {
      keys.push({
        groupId: this.insuranceCodes.breakDownKeys[groupIndex],
        codeIds: Object.keys(this.codeMap[groupIndex])
          .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
          .map(codeIndex =>
            this.insuranceCodes.breakDowns[this.insuranceCodes.breakDownKeys[groupIndex]].breakDownKeys[codeIndex]
          )
      });
    });

    this.clinicService.saveSelectedPracticeCodes(this.selectedClinic.addressId, keys).pipe(take(1)).subscribe(console.log);
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
    }
  }

  private watchTrigger(): void {
    this.triggerInsurance.pipe(
      switchMap(() =>
        this.clinicService.getSelectedPracticeCodes(this.selectedClinic.addressId)
          .pipe(map(r => r.data), catchError(() => of([])))
      ),
      takeUntil(this.unsubscribe$)
    ).subscribe((res) => {
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
