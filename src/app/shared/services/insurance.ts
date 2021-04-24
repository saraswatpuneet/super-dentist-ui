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
    { label: 'January', value: '1', },
    { label: 'Febuary', value: '2', },
    { label: 'March', value: '3', },
    { label: 'April', value: '4', },
    { label: 'May', value: '5', },
    { label: 'June', value: '6', },
    { label: 'July', value: '7', },
    { label: 'August', value: '8', },
    { label: 'September', value: '9', },
    { label: 'October', value: '10', },
    { label: 'November', value: '11', },
    { label: 'December', value: '12', },
  ];
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
