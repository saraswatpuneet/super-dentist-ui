export interface ConfirmationResponse {
  success: boolean;
  message?: string;
}

export interface Referral {
  referralId: string;
  document: string[];
  fromPlaceId: string;
  toPlaceId: string;
  fromClinicName: string;
  toClinicName: string;
  fromClinicAddress: string;
  toClinicAddress: string;
  status: ReferralStatus;
  reasons: string[];
  history: string[];
  tooth: string[];
  createdOn: number;
  modifiedOn: number;
  patientEmail: string;
  patientFirstName: string;
  patientLastName: string;
  patientPhone: string;
  fromEmail: string;
  toEmail: string;
  isDirty: boolean;
}

export interface ReferralDetails {
  patient: Patient;
  status?: ReferralStatus;
  reasons?: string[];
  history?: string[];
  tooth?: string[];
  fromAddressId?: string;
  toAddressId?: string;
  toPlaceId?: string;
}

export interface Patient {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ReferralStatus {
  gdStatus: string;
  spStatus: string;
}

export interface Conversation {
  cursor?: string; // The location id of the paginator. Should be handled by the backend to load the most recent 20 messages
  messages: Message[];
}

export interface Message {
  messageId: string; // This is necessary for scaling reactions on a message
  text?: string;
  timestamp?: number;
  channel: Channel;
  userId: string; // id of the user
}

export type Channel = 'c2c' | 'c2p'; // Store as string in the backend so more channels can be created in the future.


