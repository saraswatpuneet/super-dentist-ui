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
  toAddressId?: string; // send either toAddressId or toPlaceId
  toPlaceId?: string;
}

export interface Patient {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface ReferralStatus {
  gdStatus: ClinicStatus;
  spStatus: ClinicStatus;
}

// OperationCompleted and Canceled are interchangable on the steps it's one or the other resulting in 4 steps to be selected
export type ClinicStatus = 'referred' | 'scheduled' | 'completed' | 'cancelled' | 'closed';

export interface Conversation {
  cursor?: string; // The location id of the paginator. Should be handled by the backend to load the most recent 20 messages
  messages: Message[];
}

export interface Message {
  messageId?: string;
  text?: string;
  timeStamp?: number;
  channel: Channel;
  userId?: string;
}

export interface ReferredStatusMapping {
  readonly label: string;
  readonly percentRemaining: number;
}

export type Channel = 'c2c' | 'c2p';

// referredStatus and sort must list all keys in the order preferred sorted
export function referredStatus(): { [key: string]: ReferredStatusMapping } {
  return {
    referred: { label: 'Referred', percentRemaining: 75 },
    scheduled: { label: 'Scheduled', percentRemaining: 50 },
    completed: { label: 'Completed', percentRemaining: 25 },
    cancelled: { label: 'Cancelled', percentRemaining: 25 },
    closed: { label: 'closed', percentRemaining: 0 },
  };
}

export function sortReferredStatus(): string[] {
  return ['referred', 'scheduled', 'completed', 'cancelled', 'closed'];
}
