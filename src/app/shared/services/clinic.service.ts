import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

import { ClinicDetail, DoctorDetail, ClinicServicesOffered } from './clinic';
import { shareReplay, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DentalBreakDowns, DentalInsuranceKeys } from './insurance';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private baseUrl = `${environment.baseUrl}/clinic`;
  private cache: any = {};
  private readonly clinicCode = 'getClinics';
  private readonly favoriteCode = 'favorite';

  constructor(private http: HttpClient) { }

  getDoctor(clinicAddressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${clinicAddressId}`);
  }

  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllDoctors`);
  }

  getClinic(clinicId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/info/${clinicId}`);
  }

  getClinics(): Observable<any> {
    if (this.cache[this.clinicCode]) {
      return this.cache[this.clinicCode];
    }

    return this.cache[this.clinicCode] = this.http.get(`${this.baseUrl}/getClinics`).pipe(
      shareReplay(1),
      catchError(err => {
        console.error(err);
        delete this.cache[this.clinicCode];
        return EMPTY;
      }));
  }

  getAllClinics(pageSize?: number, cursor?: string): Observable<any> {
    let url = `${this.baseUrl}/getAll`;

    if (pageSize) {
      url += `?pageSize=${pageSize}`;
      if (cursor) {
        url += `&cursor=${cursor}`;
      }
    }


    return this.http.get(url);
  }

  clearCache(): void {
    this.cache = {};
  }

  clearFavorites(): void {
    delete this.cache[this.favoriteCode];
  }

  getNearbyClinics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNearbyClinics`);
  }

  getNearbySpecialists(addressId: string, specialties: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getNearbySpecialists`, {
      addressId,
      specialties,
    });
  }

  directJoin(secureKey: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/directJoin?secureKey=${secureKey}&places={"placeIds":${JSON.stringify(placeIds)}}`, null);
  }

  getAddress(address: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAddressList?searchText=${address}`);
    // this needs to implement a websocket of some kind.
  }

  addFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/addFavorites/${addressId}`, { placeIds });
  }

  getFavoriteClinics(addressId: string): Observable<any> {
    if (this.cache[this.favoriteCode]) {
      return this.cache[this.favoriteCode];
    }

    return this.cache[this.favoriteCode] = this.http.get(`${this.baseUrl}/getFavorites/${addressId}`).pipe(
      shareReplay(1),
      catchError(err => {
        console.error(err);
        delete this.cache[this.favoriteCode];
        return EMPTY;
      }));
  }

  removeFavoriteClinics(addressId: string, placeIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/removeFavorites/${addressId}`, { placeIds });
  }

  getNetworkFavorites(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getNetwork/${addressId}`);
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

  getSelectedPracticeCodes(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/practiceCodes/${addressId}`);
  }

  getSelectedPracticeCodesHistory(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/practiceCodesHistory/${addressId}`);
  }

  saveSelectedPracticeCodes(addressId: string, selectedCodes: DentalInsuranceKeys[]): Observable<DentalBreakDowns> {
    return this.http.post<any>(`${this.baseUrl}/practiceCodes/${addressId}`, selectedCodes);
  }

  saveSelectedPracticeCodesHistory(addressId: string, selectedCodes: DentalInsuranceKeys[]): Observable<DentalBreakDowns> {
    return this.http.post<any>(`${this.baseUrl}/practiceCodesHistory/${addressId}`, selectedCodes);
  }
}
