import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { takeUntil, switchMap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { InsuranceService } from 'src/app/shared/services/insurance.service';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { Base } from 'src/app/shared/base/base-component';
import { PatientService } from 'src/app/shared/services/patient.service';
import { DentalBreakDowns } from 'src/app/shared/services/insurance';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent extends Base implements OnChanges, OnInit {
  @Input() codes: DentalBreakDowns;
  private triggerCodeSearch = new Subject();

  constructor(
    private patientService: PatientService,
    private clinicService: ClinicService
  ) { super(); }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
  }

}
