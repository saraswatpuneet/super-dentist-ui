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
  chatBox?: string;
  comment: string;
  createdBy?: string;
  time?: string;
}

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
