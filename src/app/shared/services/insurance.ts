export interface DentalBreakDowns {
  key: string;
  label: string;
  breakDownKeys?: string[];
  breakDowns?: DentalBreakDown;
}

export interface DentalBreakDown {
  [key: string]: DentalBreakDowns;
}

export interface DentalInsuranceKeys {
  groupId: string;
  codeIds: string[];
}

export interface ValueLabel {
  value: any;
  label: string;
}

export function missingToothClauses(): ValueLabel[] {
  return [
    { value: 'crowns', label: 'Crowns' },
    { value: 'bridges', label: 'Bridges' },
    { value: 'dentures', label: 'Dentures' },
    { value: 'implants', label: 'Implants' },
  ];
}
export function missingToothClausesKeyValue(): any {
  return {
    crowns: 'Crowns',
    bridges: 'Bridges',
    dentures: 'Dentures',
    implants: 'Implants',
  };
}

export function radioOptions(): ValueLabel[] {
  return [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];
}
export function radioOptionsKeyValue(): any {
  return {
    yes: 'Yes',
    no: 'No'
  };
}

export function eligibilityOptions(): ValueLabel[] {
  return [
    { value: 'calendar', label: 'Calendar' },
    { value: 'benefit', label: 'Benefit' },
  ];
}
export function eligibilityOptionsKeyValue(): any {
  return {
    calendar: 'Calendar',
    benefit: 'Benefit',
  };
}

export function unitOptions(): ValueLabel[] {
  return [
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
    { value: 'lt', label: 'Lifetime' },
  ];
}

export function coordinationOfBenefits(): ValueLabel[] {
  return [
    { value: 'standard', label: 'Standard' },
    { value: 'nonDuplication', label: 'Non-Duplication' },
    { value: 'doesNotCoordinate', label: 'Does not coordinate' },
    { value: 'other', label: 'Other' }
  ];
}

export function coordinationOfBenefitsKeyValue(): any {
  return {
    standard: 'Standard',
    nonDuplication: 'Non-Duplication',
    doesNotCoordinate: 'Does not coordinate',
    other: 'Other'
  };
}

export function months(): ValueLabel[] {
  return [
    { label: 'Jan', value: '01', },
    { label: 'Feb', value: '02', },
    { label: 'Mar', value: '03', },
    { label: 'Apr', value: '04', },
    { label: 'May', value: '05', },
    { label: 'June', value: '06', },
    { label: 'July', value: '07', },
    { label: 'Aug', value: '08', },
    { label: 'Sept', value: '09', },
    { label: 'Oct', value: '10', },
    { label: 'Nov', value: '11', },
    { label: 'Dec', value: '12', },
  ];
}

export function monthsHash(): any {
  return {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'Aug',
    '09': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  };
}


export function patientStatus(): ValueLabel[] {
  return [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'termed', label: 'Termed' },
    { value: 'incomplete', label: 'Incomplete Info' },
    { value: 'discount-plan', label: 'Discount plan' },
    { value: 'medicare-plan', label: 'Medicare plan' }
  ];
}
