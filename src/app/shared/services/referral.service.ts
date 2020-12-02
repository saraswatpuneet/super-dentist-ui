import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ChatBox, comments, ReferralDetails } from './referral';

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

  addComments(id: string, comment: string, chatBox: ChatBox): Observable<any> {
    return this.http.post(`${this.baseUrl}/addComments/${id}`,
      {
        comments: [{ comment, chatBox, time: Date.now() }]
      });
  }

  mockComments(): Observable<any> {
    return of(comments);
  }

  updateStatus(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateStatus/${id}`, {});
  }

  uploadDocuments(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadDocuments/${id}`, formData);
  }

  getDentist(addressId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/gdReferrals?addressId=${addressId}`);
  }

  getSpecialist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/spReferrals`);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getOne/${id}`);
  }

  downloadDocuments(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/downloadDocuments/${id}`, { responseType: 'blob' });
  }
}
