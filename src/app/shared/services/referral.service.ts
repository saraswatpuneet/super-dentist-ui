import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  Channel,
  Conversation,
  Message,
  Referral,
  ReferralDetails,
  ReferralStatus
} from './referral';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  create(referral: ReferralDetails): Observable<Referral> {
    return this.http.post<Referral>(`${this.baseUrl}/referrals`, referral)
      .pipe(map((res: any) => res.data as Referral));
  }

  delete(referralId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/referrals/${referralId}`);
  }

  get(referralId: string): Observable<Referral> {
    return this.http.get<Referral>(`${this.baseUrl}/referrals/${referralId}`).pipe(map((res: any) => res.data as Referral));
  }

  requestDemo(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/referral/scheduledemo`, formData);
  }

  // Documents
  getAllDocuments(referralId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/referrals/${referralId}/documents`, { responseType: 'blob' });
  }

  uploadDocuments(referralId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/referrals/${referralId}/documents`, formData);
  }

  getDocumentFile(referralId: string, fileName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/referrals/${referralId}/document?fileName=${fileName}`, { responseType: 'blob' });
  }

  getDocument(referralId: string, documentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/referrals/${referralId}/documents/${documentId}`, { responseType: 'blob' });
  }

  // Status
  updateStatus(referralId: string, status: ReferralStatus): Observable<Referral> {
    return this.http.put<Referral>(`${this.baseUrl}/referrals/${referralId}/status`, { status })
      .pipe(map((res: any) => res.data as Referral));
  }

  // Messages
  createMessage(referralId: string, message: Message[]): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}/referrals/${referralId}/messages`, { comments: message })
      .pipe(map((res: any) => res.data[0] as Message));
  }

  getMessages(referralId: string, channel?: Channel): Observable<Message[]> {
    // cursor can be used as a query param in the future if we decide to allow for pagination.
    return this.http.get<Conversation>(`${this.baseUrl}/referrals/${referralId}/messages${!!channel ? `?channel=${channel}` : null}`)
      .pipe(map((res: any) => res.data.sort((a, b) => a.timeStamp - b.timeStamp) as Message[]));
  }

  getMessage(referralId: string, messageId: string): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/referrals/${referralId}/messages/${messageId}`);
  }

  // Clinic Referrals
  getDentistRerrals(addressId: string): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.baseUrl}/referrals-by-clinic/dentist?addressId=${addressId}`)
      .pipe(map((res: any) => res.data as Referral[]));
  }

  getSpecialistReferrals(placeId: string): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.baseUrl}/referrals-by-clinic/specialist?placeId=${placeId}`)
      .pipe(map((res: any) => res.data as Referral[]));
  }
}
