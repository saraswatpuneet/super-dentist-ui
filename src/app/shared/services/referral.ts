export interface ReferralDetails {
  patient: Patient;
  status?: Status;
  reasons?: string[];
  comments?: Comment[];
  history?: string[];
  tooth?: string[];
  fromAddressId?: string;
  toAddressId?: string;
  toPlaceId?: string;
}

export interface Comment {
  comment: string;
  time?: number;
  chatBox?: ChatBox;
}

export type ChatBox = 'gd' | 'sp' | 'patient';

export interface Conversation {
  cursor: string; // The location id of the paginator. Should be handled by the backend to load the most recent 20 messages
  messages: Message[];
}

export interface Message {
  messageId: string; // This is necessary for scaling reactions on a message
  text?: string;
  timestamp: number;
  channel: Channel;
  userId: string; // id of the user
}

export type Channel = 'c2c' | 'c2p'; // Store as string in the backend so more channels can be created in the future.

export interface Status {
  gdStatus: string;
  spStatus: string;
}

export interface Patient {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}
