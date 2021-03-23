export interface DentalBreakDowns {
  key: string;
  label: string;
  breakDownKeys?: string[];
  breakDowns?: DentalBreakDown;
}

export interface DentalBreakDown {
  [key: string]: DentalBreakDowns;
}

export interface DentalGroups {
  label: string;
  categories: DentalInsuranceMap[];
}

export interface DentalInsuranceMap {
  groupOrder: string[];
  groups: Map<string, DentalCode>;
  label: string;
  key: string;
}

export interface DentalCode {
  key: string;
  label: string;
}


export interface DentalInsruanceKeyMap {
  group: string;
  items: string[];
}
