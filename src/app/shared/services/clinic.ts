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

export function specialistReasons(): { [key: string]: any } {
  return {
    endodontics: endodonticsReasons(),
    oralSurgery: oralSurgeryReasons(),
    periodontics: periodonticsReasons(),
    pediatricDentist: pediatricDentistReasons(),
    orthodontics: orthodonticsReasons(),
    prosthodontics: prosthodonticsReasons(),
  };
}

export function sortSpecialistReasons(): string[] {
  return ['endodontics', 'oralSurgery', 'periodontics', 'pediatricDentist', 'prosthodontics'];
}

function endodonticsReasons(): any {
  return {
    consultation: { label: 'Consultation', value: 'consultation' },
    rootCanalTheropy: { label: 'Root Canal Theropy', value: 'rootCanalTheropy' },
    rootCanalRetreatment: { label: 'Root Canal Retreatment', value: 'rootCanalRetreatment' },
    apicoectomySurgery: { label: 'Apicoectomy Surgery', value: 'apicoectomySurgery' },
    postSpaceReparation: { label: 'Post Space Reparation', value: 'postSpaceReparation' },
    other: { label: 'Other', value: 'other' },
  };
}

function oralSurgeryReasons(): any {
  return {
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
    other: { label: 'Other', value: 'other' },
  };
}

function periodonticsReasons(): any {
  return {
    completePeriodontalExamination: { label: 'Complete Periodontal Examination', value: '' },
    isolatedPeriodontalExamination: { label: 'Isolated Periodontal Examination', value: '' },
    crownLengthening: { label: 'Crown Lengthening', value: '' },
    gtr: { label: 'Bone Grafting / GTR', value: '' },
    recessional: { label: 'Recessional / Gingival Grafting', value: '' },
    extractions: { label: 'Extraction(s)', value: '' },
    implantConsultation: { label: 'Implant Consultation', value: '' },
    '3dImaging': { label: '3D Imaging', value: '' },
    sinusLift: { label: 'Sinus Lift', value: '' },
    socketPreservation: { label: 'Socket Preservation (GBR)', value: '' },
    laserTherapy: { label: 'Laser Therapy', value: '' },
    ridgeAugmentation: { label: 'Ridge Augmentation', value: '' },
    allOn4: { label: 'All on 4', value: '' },
    other: { label: 'Other', value: '' },
  };
}

function pediatricDentistReasons(): any {
  return {
    '1stDentalVisit': { label: '1st Dental Visit', value: '' },
    toothache: { label: 'Toothache', value: '' },
    decay: { label: 'Decay', value: '' },
    sealants: { label: 'Sealants', value: '' },
    specialNeeds: { label: 'Special Needs', value: '' },
    xRays: { label: 'X-Rays', value: '' },
    sedation: { label: 'Sedation / Anesthesia', value: '' },
    other: { label: 'Other', value: '' },
  };
}

function orthodonticsReasons(): any {
  return {
    interceptiveTreatmentEvaluation: { label: 'Early / Interceptive Treatment Evaluation', value: '' },
    comprehensiveTreatmentEvaluation: { label: 'Comprehensive Treatment Evaluation', value: '' },
    aligners: { label: 'Aligners / Invisalign', value: '' },
    orthognathicSurgicalTreatmentEvaluation: { label: 'Orthognathic Surgical Treatment Evaluation', value: '' },
    '3DImaging': { label: '3D Imaging', value: '' },
    other: { label: 'Other', value: '' },
  };
}

function prosthodonticsReasons(): any {
  return {
    fullMouthReconstruction: { label: 'Full Mouth Reconstruction', value: '' },
    dentalImplants: { label: 'Dental Implants', value: '' },
    estheticEvaluation: { label: 'Esthetic Evaluation', value: '' },
    fixedProsthodontics: { label: 'Fixed Prosthodontics', value: '' },
    other: { label: 'Other', value: '' },
  }
}