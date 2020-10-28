export interface ClinicDetail {
  clinicType: 'string';
  clinicName: 'string';
  clinicAddress: 'string';
  clinicEmailAddress: 'string';
  clinicPhoneNumber: 'string';
  clinicSpeciality: string[];
}

export interface DoctorDetail {
  clinicAddressId: string;
  doctors: Doctor[];
}

export interface Doctor {
  doctorPrefix: string;
  doctorFirstName: string;
  doctorLastName: string;
  doctorEmailAddress: string;
  doctorSpeciality: string[];
}

export interface ClinicServicesOffered {
  serviceGroup: string;
  serviceList: string[];
}
