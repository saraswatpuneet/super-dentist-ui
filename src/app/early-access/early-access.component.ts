import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-early-access',
  templateUrl: './early-access.component.html',
  styleUrls: ['./early-access.component.scss']
})
export class EarlyAccessComponent implements OnInit {
  accessForm: FormGroup;
  @ViewChild('pms') pms: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  submitAccess(): void {
    const url = `https://us-central1-superdentist.cloudfunctions.net/sd-live-demo-request`;
    const data = new FormData();
    const v = this.accessForm.value;
    for (const key in v) {
      if (key) {
        data.append(key, v[key]);
      }
    }
    if (this.pms.selectedOptions && this.pms.selectedOptions.length > 0) {
      data.append('pms', JSON.stringify(this.pms.selectedOptions.selected.map(s => s.value)));
    }

    this.http.post(url, data).subscribe(console.log);
  }

  private initForm(): void {
    this.accessForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      organization: ['', Validators.required],
      locationCount: [1, Validators.required],
    });
  }
}
