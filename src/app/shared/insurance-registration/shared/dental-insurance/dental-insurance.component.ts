import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Base } from 'src/app/shared/base/base-component';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-dental-insurance',
  templateUrl: './dental-insurance.component.html',
  styleUrls: ['./dental-insurance.component.scss']
})
export class DentalInsuranceComponent extends Base implements OnInit {
  @Input() companies = [];
  @Output() cancel = new EventEmitter();
  @Output() addInsurance = new EventEmitter();
  filteredCompanies = [];
  dentalForm: FormGroup;
  subscriber = true;
  private fromSelect = false;

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.dentalForm = this.fb.group({
      company: ['', Validators.required],
      companyId: [''],
      memberId: ['', Validators.required]
    });

    this.dentalForm.get('company').valueChanges.pipe(
      filter(() => {
        if (this.fromSelect) {
          this.fromSelect = false;
          return false;
        }

        return true;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      if (!value) {
        this.filteredCompanies = [];
      } else {
        this.filteredCompanies = this.companies.filter(c => c.toLowerCase().includes(value.toLowerCase()));
      }
    });
  }

  subscriber2(e): void {
    this.subscriber = e.checked;
    if (e.checked) {
      this.remove();
    } else {
      this.add();
    }
  }

  selectCompany(company: any): void {
    this.fromSelect = true;
    this.dentalForm.patchValue({ company });
    this.filteredCompanies = [];
  }

  sendInsurance(): void {
    this.addInsurance.emit(this.dentalForm.value);
  }

  private add(): void {
    this.dentalForm.addControl('subscriber', this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: this.fb.group({
        month: ['1', Validators.required],
        day: ['1', Validators.required],
        year: ['2000', Validators.required],
      }),
    }));
    this.dentalForm.updateValueAndValidity();
  }

  private remove(): void {
    this.dentalForm.removeControl('subscriber');
  }
}
