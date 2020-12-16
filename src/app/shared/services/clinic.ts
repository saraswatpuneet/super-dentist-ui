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

// Key types for specialist
export type SpecialistType = 'endodontics' | 'oralSurgry' | 'periodontics' | 'pediatricDentist' | 'prosthodontics';

export function specialistReasons(): { [key: string]: any } {
  return {
    endodontics: {},
    oralSurgry: {},
    periodontics: {},
    pediatricDentist: {},
    prosthodontics: {},
  };
}

export function sortSpecialistReasons(): string[] {
  return ['endodontics', 'oralSurgry', 'periodontics', 'pediatricDentist', 'prosthodontics'];
}