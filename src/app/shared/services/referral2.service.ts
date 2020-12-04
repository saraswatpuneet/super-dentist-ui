import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Channel,
  ConfirmationResponse,
  Conversation,
  Message,
  Referral,
  ReferralDetails,
  ReferralStatus
} from './referral2';

@Injectable({
  providedIn: 'root'
})
export class ReferralService2 {
  private baseUrl = 'https://superdentist.io/api/sd/v1';

  constructor(private http: HttpClient) { }

  create(referral: ReferralDetails): Observable<Referral> {
    return this.http.post<Referral>(`${this.baseUrl}/referrals`, referral);
  }

  delete(referralId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/referrals/${referralId}`);
  }

  get(referralId: string): Observable<Referral> {
    return this.http.get<Referral>(`${this.baseUrl}/referrals/${referralId}`);
  }

  // Documents
  getAllDocuments(referralId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/referrals/${referralId}/documents`, { responseType: 'blob' });
  }

  uploadDocuments(referralId: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/referrals/${referralId}/documents`, formData);
  }

  getDocument(referralId: string, documentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/referrals/${referralId}/documents/${documentId}`, { responseType: 'blob' });
  }

  // Status
  updateStatus(referralId: string, status: ReferralStatus): Observable<Referral> {
    return this.http.put<Referral>(`${this.baseUrl}/referrals/${referralId}/status`, status);
  }

  // Messages
  createMessage(referralId: string, message: Message): Observable<any> {
    return this.http.post(`${this.baseUrl}/referrals/${referralId}/messages`, message);
  }

  getMessages(referralId: string, channel: Channel): Observable<Conversation> {
    // cursor can be used as a query param in the future if we decide to allow for pagination.
    return this.http.get<Conversation>(`${this.baseUrl}/referrals/${referralId}/messages?channel=${channel}`);
  }

  getMessage(referralId: string, messageId: string): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/referrals/${referralId}/messages/${messageId}`);
  }

  // Clinic Referrals
  getDentistRerrals(addressId: string): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.baseUrl}/referrals-by-clinic/dentist?addressId=${addressId}`);
  }

  getSpecialistReferrals(placeId: string): Observable<Referral[]> {
    return this.http.get<Referral[]>(`${this.baseUrl}/referrals-by-clinic/specialist?placeId=${placeId}`);
  }
}
