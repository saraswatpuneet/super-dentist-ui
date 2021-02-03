import { Component, OnInit } from '@angular/core';
import { catchError, map, takeUntil, take, debounceTime, switchMap, filter, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { Base } from 'src/app/shared/base/base-component';
import { ClinicService } from 'src/app/shared/services/clinic.service';

@Component({
  selector: 'app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.scss']
})
export class PracticesComponent extends Base implements OnInit {
  loading = false;
  myClinics = [];
  selectedClinic = undefined;
  addingClinic = false;
  filteredClinics = [];
  address = '';
  selectedAddress: any;
  count = 0;
  specialistTypes = [
    { label: 'Endodontics', value: 'endodontist', selected: false },
    { label: 'Oral Surgeon', value: 'oralSurgeon', selected: false },
    { label: 'Orthodontics', value: 'orthodontist', selected: false },
    { label: 'Pediatric Dentist', value: 'pediatricDentist', selected: false },
    { label: 'Periodontics', value: 'periodontist', selected: false },
    { label: 'Prosthodontics', value: 'prosthodontist', selected: false },
  ];
  user: firebase.default.User;
  private addressTrigger = new Subject<string>();
  private clinicTrigger = new Subject<string>();

  constructor(
    private auth: AngularFireAuth,
    private clinicService: ClinicService
  ) { super(); }

  ngOnInit(): void {
    this.auth.currentUser.then(user => this.user = user);
    this.watchAddressTrigger();
    this.watchClinicTrigger();
    this.clinicTrigger.next();
  }

  editClinic(clinic: any): void {
    this.selectedClinic = { ...clinic };
  }

  selectAddress(address: any): void {
    this.address = '';
    this.filteredClinics = [];
    this.selectedAddress = address;
  }

  addressChanged($event): void {
    this.addressTrigger.next($event);
  }

  addClinic(): void {
    this.loading = true;
    this.clinicService.addClinic([{
      address: this.selectedAddress.formatted_address,
      emailAddress: this.user.email,
      name: this.selectedAddress.name,
      phoneNumber: '',
      specialty: this.specialistTypes.filter(s => s.selected).map(y => y.value),
      type: 'specialist',
    }]).pipe(take(1)).subscribe(res => {
      this.cancelAddClinic();
      this.clinicTrigger.next();
    });
  }

  setSelected(): void {
    this.count = this.specialistTypes.filter(s => s.selected === true).length;
  }

  cancelAddClinic(): void {
    this.addingClinic = false;
    this.selectedAddress = undefined;
    this.count = 0;
    this.specialistTypes.forEach(r => r.selected = false);
  }

  updateClinic(): void {
    this.loading = true;

    this.clinicService.addClinic([{
      address: this.selectedClinic.address,
      emailAddress: this.selectedClinic.emailAddress,
      name: this.selectedClinic.name,
      phoneNumber: this.selectedClinic.phoneNumber,
      specialty: this.selectedClinic.specialty,
      type: this.selectedClinic.type,
    }]).pipe(
      take(1)
    ).subscribe(() => {
      this.selectedClinic = undefined;
      this.clinicTrigger.next();
    });
  }

  private watchAddressTrigger(): void {
    this.addressTrigger.pipe(
      filter(value => !!value),
      debounceTime(300),
      switchMap(value => this.clinicService.getAddress(value)),
      takeUntil(this.unsubscribe$)
    ).subscribe(res => this.filteredClinics = res.data.addressList);
  }

  private watchClinicTrigger(): void {
    this.clinicTrigger.pipe(
      switchMap(() => this.clinicService.getClinics()),
      tap(() => this.loading = true),
      catchError(() => of({
        r: { data: { clinicDetails: [] } }
      })),
      map(r => r.data.clinicDetails),
      takeUntil(this.unsubscribe$)
    ).subscribe(clinics => {
      this.myClinics = clinics;
      this.loading = false;
    });
  }
}
