
export interface InsuranceGroup {
  category: string;
  componentKeys: string[];
  components: InsuranceMap;
}

export interface InsuranceMap {
  [key: string]: InsuranceComponent;
}

export interface InsuranceComponent {
  key: string;
  label: string;
  required: boolean;
  type: string; // This is the type of component to use, text, number, file, etc.
  value: any;
}

export function generateGroups(): InsuranceGroup[] {
  return [
    {
      category: 'General Information',
      componentKeys: [
        'status',
        'patientName',
        'patientDob',
        'subscriberName',
        'subscriberDob',
        'subscriberId',
        'insuranceName',
        'insuranceMailingAddress',
        'payerId',
        'groupNumber',
        'annualMaximum',
        'maximumUsed',
        'deductibleInd',
        'deductibleMetAmtInd',
        'deductibleFamily',
        'deductibleMetAmtFamily',
        'missingToothClause',
        'waitingPeriods',
        'calendarOrBenefitYear',
        'inNetwork',
        'preventiveDeductedFromMaximum',
        'feeSchedule'
      ],
      components: generateGeneralInformation()
    },
    {
      category: 'Categories (can add one % or a range)',
      componentKeys: [
        '01001999',
        '20002699',
        '27002899',
        '29002999',
        '30003999',
        '40004999',
        '50005899',
        '59005999',
        '60006199',
        '62006999',
        '70007999',
        '80008999',
        '90009999'
      ],
      components: generateCategories()
    },
    {
      category: 'History',
      componentKeys: [
        'periodicExam',
        'compExam',
        'fmxPano',
        'bwx',
        'prophy',
        'sealants',
        'sdf',
        'perioMaint',
        'srp',
        'crowns',
        'restorations'
      ],
      components: generateHistory()
    }
  ];
}

export function generateGeneralInformation(): InsuranceMap {
  return {
    status: {
      key: '',
      label: 'Status',
      required: true,
      type: '',
      value: '',
    },
    patientName: {
      key: '',
      label: 'Patient Name',
      required: true,
      type: '',
      value: '',
    },
    patientDob: {
      key: '',
      label: 'Patient Birtdhay',
      required: true,
      type: '',
      value: '',
    },
    subscriberName: {
      key: '',
      label: 'Subscriber Name',
      required: true,
      type: '',
      value: '',
    },
    subscriberDob: {
      key: '',
      label: 'Subscriber Birthday',
      required: true,
      type: '',
      value: '',
    },
    subscriberId: {
      key: '',
      label: 'Subscriber Id',
      required: true,
      type: '',
      value: '',
    },
    insuranceName: {
      key: '',
      label: 'Insurance Name',
      required: true,
      type: '',
      value: '',
    },
    insuranceMailingAddress: {
      key: '',
      label: 'Insurance Mailing Address',
      required: true,
      type: '',
      value: '',
    },
    payerId: {
      key: '',
      label: 'Payer Id',
      required: true,
      type: '',
      value: '',
    },
    groupNameNumber: {
      key: '',
      label: 'Group Name',
      required: true,
      type: '',
      value: '',
    },
    groupNumber: {
      key: '',
      label: 'Group Number',
      required: true,
      type: '',
      value: '',
    },
    annualMaximum: {
      key: '',
      label: 'Annual Maximum',
      required: true,
      type: '',
      value: '',
    },
    maximumUsed: {
      key: '',
      label: 'Maximum Used',
      required: true,
      type: '',
      value: '',
    },
    deductibleInd: {
      key: '',
      label: 'Deductible (In Network)',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtInd: {
      key: '',
      label: 'Deductible Met Amount (In Network)',
      required: true,
      type: '',
      value: '',
    },
    deductibleFamily: {
      key: '',
      label: 'Deductible (Family)',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtFamily: {
      key: '',
      label: 'Deductible Met Amount (Family)',
      required: true,
      type: '',
      value: '',
    },
    missingToothClause: {
      key: '',
      label: 'Missing Tooth Clause',
      required: true,
      type: '',
      value: '',
    },
    waitingPeriods: {
      key: '',
      label: 'Waiting Periods',
      required: true,
      type: '',
      value: '',
    },
    calendarOrBenefitYear: {
      key: '',
      label: 'Calendar or Benefit Year',
      required: true,
      type: '',
      value: '',
    },
    inNetwork: {
      key: '',
      label: 'In Network',
      required: true,
      type: '',
      value: '',
    },
    preventiveDeductedFromMaximum: {
      key: '',
      label: 'Preventative Deducted from Maximum',
      required: true,
      type: '',
      value: '',
    },
    feeSchedule: {
      key: '',
      label: 'Fee Schedule',
      required: true,
      type: '',
      value: '',
    }
  };
}

export function generateCategories(): InsuranceMap {
  return {
    '01001999': {
      key: '',
      label: '0100-1999 Diag/Preventative',
      required: true,
      type: '',
      value: '',
    },
    20002699: {
      key: '',
      label: '2000-2699 Basic Restorative',
      required: true,
      type: '',
      value: '',
    },
    27002899: {
      key: '',
      label: '2700-2899 Crowns',
      required: true,
      type: '',
      value: '',
    },
    29002999: {
      key: '',
      label: '2900-2999 Other Restorative',
      required: true,
      type: '',
      value: '',
    },
    30003999: {
      key: '',
      label: '3000-3999 Endodontics',
      required: true,
      type: '',
      value: '',
    },
    40004999: {
      key: '',
      label: '4000-4999 Periodontics',
      required: true,
      type: '',
      value: '',
    },
    50005899: {
      key: '',
      label: '5000-5899 Prosthodontics, Removable',
      required: true,
      type: '',
      value: '',
    },
    59005999: {
      key: '',
      label: '5900-5999 Prosthodontics, Maxillofacial',
      required: true,
      type: '',
      value: '',
    },
    60006199: {
      key: '',
      label: '6000-6199 Implants',
      required: true,
      type: '',
      value: '',
    },
    62006999: {
      key: '',
      label: '6200-6999 Prosthodontics, Fixed',
      required: true,
      type: '',
      value: '',
    },
    70007999: {
      key: '',
      label: '7000-7999 Oral Surgery',
      required: true,
      type: '',
      value: '',
    },
    80008999: {
      key: '',
      label: '8000-8999 Orthodontics',
      required: true,
      type: '',
      value: '',
    },
    90009999: {
      key: '',
      label: '9000-9999 Adj General Services',
      required: true,
      type: '',
      value: '',
    }
  };
}

export function generateHistory(): InsuranceMap {
  return {
    periodicExam: {
      key: '',
      label: 'Periodic Exam',
      required: true,
      type: '',
      value: '',
    },
    compExam: {
      key: '',
      label: 'Comp Exam',
      required: true,
      type: '',
      value: '',
    },
    fmxPano: {
      key: '',
      label: 'FMX / Pano',
      required: true,
      type: '',
      value: '',
    },
    bwx: {
      key: '',
      label: 'BWX',
      required: true,
      type: '',
      value: '',
    },
    prophy: {
      key: '',
      label: 'Adult Prophy / Child Prophy',
      required: true,
      type: '',
      value: '',
    },
    sealants: {
      key: '',
      label: 'Sealants #2, 3, 14, 15, 18, 19, 30, 31',
      required: true,
      type: '',
      value: '',
    },
    sdf: {
      key: '',
      label: 'SDF',
      required: true,
      type: '',
      value: '',
    },
    perioMaint: {
      key: '',
      label: 'Perio Maint',
      required: true,
      type: '',
      value: '',
    },
    srp: {
      key: '',
      label: 'SRP',
      required: true,
      type: '',
      value: '',
    },
    crowns: {
      key: '',
      label: 'Crowns',
      required: true,
      type: '',
      value: '',
    },
    restorations: {
      key: '',
      label: 'Restorations',
      required: true,
      type: '',
      value: '',
    },
  };
}
