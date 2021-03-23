import { Component, OnInit } from '@angular/core';
import { takeUntil, map, switchMap, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ClinicService } from 'src/app/shared/services/clinic.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { Base } from 'src/app/shared/base/base-component';
import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';
import { dentalBreakDowns } from 'src/app/insurance-completion/insurance-completion2';

@Component({
  selector: 'app-visible-insurance-fields',
  templateUrl: './visible-insurance-fields.component.html',
  styleUrls: ['./visible-insurance-fields.component.scss']
})
export class VisibleInsuranceFieldsComponent extends Base implements OnInit {
  clinics: any;
  selectedClinic: any;
  insuranceCodes: DentalBreakDowns;
  selectedCodes: DentalBreakDowns = {
    key: '',
    label: '',
    breakDownKeys: [],
    breakDowns: {}
  };
  private triggerInsurance = new Subject();

  constructor(
    private clinicService: ClinicService,
    private patientService: PatientService,
    private insuranceService: InsuranceService
  ) { super(); }

  ngOnInit(): void {
    this.watchTrigger();
    this.insuranceService.getPracticeCodes()
      .pipe(take(1))
      .subscribe(codes => {
        this.insuranceCodes = codes;
        console.log(codes);
      });

    this.clinicService.getClinics()
      .pipe(
        map(res => res.data.clinicDetails),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(clinics => {
        this.clinics = clinics;
        this.selectedClinic = this.clinics[0];
        this.triggerInsurance.next();
      });
  }

  submitCodes(): void {
    this.selectedCodes.breakDownKeys = Object.keys(this.selectedCodes.breakDowns);
    this.selectedCodes.breakDownKeys.forEach(k => {
      this.selectedCodes.breakDowns[k].breakDownKeys = Object.keys(this.selectedCodes.breakDowns[k].breakDowns);
    });
    this.selectedCodes.key = this.insuranceCodes.key;
    this.selectedCodes.label = this.insuranceCodes.label;
    this.clinicService.saveSelectedPracticeCodes(this.selectedClinic.addressId, this.selectedCodes).pipe(take(1)).subscribe(console.log);
    console.log('Selected Clinic', this.selectedClinic);
    console.log('Selected Codes', this.selectedCodes);
  }

  toggleBreakDown(checked: boolean, breakDown: any, subBreakDown: any): void {
    if (checked) {
      if (!this.selectedCodes.breakDowns[breakDown.key]) {
        this.selectedCodes.breakDowns[breakDown.key] = { key: breakDown.key, label: breakDown.label, breakDowns: {} };
      }
      this.selectedCodes.breakDowns[breakDown.key].breakDowns[subBreakDown.key] = subBreakDown;
    } else {
      delete this.selectedCodes.breakDowns[breakDown.key].breakDowns[subBreakDown.key];
    }
  }

  private watchTrigger(): void {
    this.triggerInsurance.pipe(
      switchMap(() => this.clinicService.getSelectedPracticeCodes(this.selectedClinic.addressId)),
      takeUntil(this.unsubscribe$)
    ).subscribe(console.log);
  }
}
