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
export type SpecialistType = 'endodontics' | 'oralSurgery' | 'periodontics' | 'pediatricDentist' | 'prosthodontics';

export function sortSpecialistReasons(): string[] {
  return ['endodontics', 'oralSurgery', 'periodontics', 'pediatricDentist', 'prosthodontics'];
}

export const sKeys = {
  endodontics: [
    "consultation",
    "rootCanalTheropy",
    "rootCanalRetreatment",
    "apicoectomySurgery",
    "postSpaceReparation",
    "other"
  ],
  oralSurgery: [
    "extraction",
    "wisdomTeeth",
    "boneGrafting",
    "allOn4",
    "oralPathology",
    "frenectomy",
    "3dImaging",
    "sedation",
    "trauma",
    "tmj",
    "proProsthetic",
    "sleepApnea",
    "other"
  ],
  periodontics: [
    "completePeriodontalExamination",
    "isolatedPeriodontalExamination",
    "crownLengthening",
    "gtr",
    "recessional",
    "extractions",
    "implantConsultation",
    "3dImaging",
    "sinusLift",
    "socketPreservation",
    "laserTherapy",
    "ridgeAugmentation",
    "allOn4",
    "other"
  ],
  pediatricDentist: [
    "completePeriodontalExamination",
    "isolatedPeriodontalExamination",
    "crownLengthening",
    "gtr",
    "recessional",
    "extractions",
    "implantConsultation",
    "3dImaging",
    "sinusLift",
    "socketPreservation",
    "laserTherapy",
    "ridgeAugmentation",
    "allOn4",
    "other"
  ],
  orthodontics: [
    "completePeriodontalExamination",
    "isolatedPeriodontalExamination",
    "crownLengthening",
    "gtr",
    "recessional",
    "extractions",
    "implantConsultation",
    "3dImaging",
    "sinusLift",
    "socketPreservation",
    "laserTherapy",
    "ridgeAugmentation",
    "allOn4",
    "other"
  ],
  prosthodontics: [
    "completePeriodontalExamination",
    "isolatedPeriodontalExamination",
    "crownLengthening",
    "gtr",
    "recessional",
    "extractions",
    "implantConsultation",
    "3dImaging",
    "sinusLift",
    "socketPreservation",
    "laserTherapy",
    "ridgeAugmentation",
    "allOn4",
    "other"
  ],
};

export const reasonsMap = {
  other: { label: 'Other', value: 'other' },

  // endodontics
  consultation: { label: 'Consultation', value: 'consultation' },
  rootCanalTheropy: { label: 'Root Canal Theropy', value: 'rootCanalTheropy' },
  rootCanalRetreatment: { label: 'Root Canal Retreatment', value: 'rootCanalRetreatment' },
  apicoectomySurgery: { label: 'Apicoectomy Surgery', value: 'apicoectomySurgery' },
  postSpaceReparation: { label: 'Post Space Reparation', value: 'postSpaceReparation' },

  // oralSurgery
  extraction: { label: 'Extraction(s)', value: 'extraction' },
  wisdomTeeth: { label: 'Wisdom Teeth', value: 'wisdomTeeth' },
  boneGrafting: { label: 'Bone Grafting', value: 'boneGrafting' },
  allOn4: { label: 'All on 4', value: 'allOn4' },
  oralPathology: { label: 'Oral Pathology', value: 'oralPathology' },
  frenectomy: { label: 'Frenectomy', value: 'frenectomy' },
  '3dImaging': { label: '3D Imaging', value: '3dImaging' },
  sedation: { label: 'General Anesthia / IV Sedation', value: 'sedation' },
  trauma: { label: 'Trauma', value: 'trauma' },
  tmj: { label: 'TMJ', value: 'tmj' },
  proProsthetic: { label: 'Pre Prosthetic ', value: 'proProsthetic' },
  sleepApnea: { label: 'Sleep Apnea', value: 'sleepApnea' },

  //Periodontics
  completePeriodontalExamination: { label: 'Complete Periodontal Examination', value: '' },
  isolatedPeriodontalExamination: { label: 'Isolated Periodontal Examination', value: '' },
  crownLengthening: { label: 'Crown Lengthening', value: '' },
  gtr: { label: 'Bone Grafting / GTR', value: '' },
  recessional: { label: 'Recessional / Gingival Grafting', value: '' },
  extractions: { label: 'Extraction(s)', value: '' },
  implantConsultation: { label: 'Implant Consultation', value: '' },
  // '3dImaging': { label: '3D Imaging', value: '' },
  sinusLift: { label: 'Sinus Lift', value: '' },
  socketPreservation: { label: 'Socket Preservation (GBR)', value: '' },
  laserTherapy: { label: 'Laser Therapy', value: '' },
  ridgeAugmentation: { label: 'Ridge Augmentation', value: '' },
  // allOn4: { label: 'All on 4', value: '' },

  // pediatric
  '1stDentalVisit': { label: '1st Dental Visit', value: '' },
  toothache: { label: 'Toothache', value: '' },
  decay: { label: 'Decay', value: '' },
  sealants: { label: 'Sealants', value: '' },
  specialNeeds: { label: 'Special Needs', value: '' },
  xRays: { label: 'X-Rays', value: '' },
  // sedation: { label: 'Sedation / Anesthesia', value: '' },

  // orthodontics
  interceptiveTreatmentEvaluation: { label: 'Early / Interceptive Treatment Evaluation', value: '' },
  comprehensiveTreatmentEvaluation: { label: 'Comprehensive Treatment Evaluation', value: '' },
  aligners: { label: 'Aligners / Invisalign', value: '' },
  orthognathicSurgicalTreatmentEvaluation: { label: 'Orthognathic Surgical Treatment Evaluation', value: '' },
  '3DImaging': { label: '3D Imaging', value: '' },

  // prosthodontics
  fullMouthReconstruction: { label: 'Full Mouth Reconstruction', value: '' },
  dentalImplants: { label: 'Dental Implants', value: '' },
  estheticEvaluation: { label: 'Esthetic Evaluation', value: '' },
  fixedProsthodontics: { label: 'Fixed Prosthodontics', value: '' },
};

export function specialistReasonKeys(specialistType: SpecialistType): string[] {
  return sKeys[specialistType];
}

export function specialistReasons(specialistType: SpecialistType): any {
  return {
    order: sKeys[specialistType],
    values: sKeys[specialistType].reduce((a, b) => (a[b] = reasonsMap[b], a), {})
  };
}