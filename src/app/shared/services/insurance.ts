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
