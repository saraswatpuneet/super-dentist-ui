import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ReferralDetails } from './referral';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  private baseUrl = 'https://superdentist.io/api/sd/v1/referral';

  constructor(private http: HttpClient) { }

  create(referral: ReferralDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, referral);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, {});
  }

  addComments(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addComments/${id}`, {});
  }

  updateStatus(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateStatus/${id}`, {});
  }

  uploadDocuments(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadDocuments/${id}`, {});
  }

  getDentist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gdReferrals`);
  }

  getSpecialist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/spReferrals`);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOne/${id}`);
  }

  downloadDocuments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/downloadDocuments/${id}`);
  }
}
