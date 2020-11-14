export interface ClinicDetail {
  address: string;
  emailAddress: string;
  name: string;
  phoneNumber: string;
  speciality: string[];
  type: string;
}

export interface DoctorDetail {
  clinicAddressId: string;
  doctors: Doctor[];
}

export interface Doctor {
  prefix: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  speciality: string[];
}

export interface ClinicServicesOffered {
  serviceGroup: string;
  serviceList: string[];
}
