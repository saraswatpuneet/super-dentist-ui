import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ClinicDetail, DoctorDetail, ClinicServicesOffered } from './clinic';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private baseUrl = `${environment.baseUrl}/clinic`;
  private myClinics$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  setMyClinics(clinics: any): void {
    this.myClinics$.next(clinics);
  }

  getMyClinics(): Observable<any> {
    return this.myClinics$.asObservable().pipe(filter(c => !!c));
  }

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

  getNearbySpecialists(addressId: string, specialities: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getNearbySpecialists`, {
      addressId,
      specialities,
    });
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAddressList?searchText=${address}`);
    // this needs to implement a websocket of some kind.
  }

  addFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addFavorites/${addressId}`, { placeIds });
  }

  getFavoriteClinics(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFavorites/${addressId}`);
  }

  removeFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeFavorites/${addressId}`, { placeIds });
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
