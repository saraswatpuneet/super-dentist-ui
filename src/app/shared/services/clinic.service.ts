import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClinicDetail, DoctorDetail, ClinicServicesOffered } from './clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private baseUrl = 'https://superdentist.io/api/sd/v1/clinic';

  constructor(private http: HttpClient) { }

  getDoctor(clinicAddressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clinicAddressId}`);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDoctors`);
  }

  getClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getClinics`);
  }

  getNearbyClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNearbyClinics`);
  }

  getAddress(): void {
    // this needs to implement a websocket of some kind.
  }

  registerAdmin(email: string, verified: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerAdmin`, { emailId: email, isVerified: verified });
  }

  verifyAdmin(verified: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/verifyAdmin`, { isVerified: verified });
  }

  addClinic(clinics: ClinicDetail[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addClinics`, { clinicDetails: clinics });
  }

  registerDoctors(doctorDetails: DoctorDetail[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerDoctors`, { doctorDetails });
  }

  registerPMS(pmsNames: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerPMS`, { pmsNames });
  }

  registerServices(services: ClinicServicesOffered[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/registerServices`, { services });
  }
}
