export interface Referral {
  referralId: string;
  fromPlaceId: string;
  fromClinicName: string;
  fromEmail: string;
  fromClinicAddress: string;
  toPlaceId: string;
  toClinicName: string;
  toClinicAddress: string;
  toEmail: string;
  patientEmail: string;
  patientFirstName: string;
  patientLastName: string;
  patientPhone: string;
  document: string[];
  status: ReferralStatus;
  reasons: string[];
  history: string[];
  tooth: string[];
  createdOn: number;
  modifiedOn: number;
  isDirty: boolean;
}

export interface ReferralDetails {
  patient: Patient;
  status?: ReferralStatus;
  reasons?: string[];
  history?: string[];
  tooth?: string[];
  fromAddressId?: string;
  fromPlaceId?: string; // send either fromAddressId or fromPlaceId
  toAddressId?: string; // send either toAddressId or toPlaceId
  toPlaceId?: string;
  isSummary?: boolean;
}

export interface Patient {
  email?: string;
  firstName: string;
  lastName: string;
  phone?: string;
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
    closed: { label: 'Closed', percentRemaining: 0 },
  };
}

export function sortReferredStatus(): string[] {
  return ['referred', 'scheduled', 'completed', 'cancelled', 'closed'];
}
