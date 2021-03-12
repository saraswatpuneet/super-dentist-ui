import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-completion',
  templateUrl: './insurance-completion.component.html',
  styleUrls: ['./insurance-completion.component.scss']
})
export class InsuranceCompletionComponent implements OnInit {
  insuranceGroups: InsuranceGroup[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

interface InsuranceGroup {
  category: string;
  componentKeys: string[];
}

interface InsuranceMap {
  [key: string]: InsuranceComponent;
}

interface InsuranceComponent {
  key: string;
  label: string;
  required: boolean;
  type: string; // This is the type of component to use, text, number, file, etc.
  value: any;
}

function generateGroups(): InsuranceGroup[] {
  return [
    {
      category: 'General Information',
      componentKeys: ['status', 'patientName', 'patientDob', 'subscriberName']
    },
    {
      category: 'Categories (can add one % or a range)',
      componentKeys: ['01001999', '20002699', '27002899', '29002999']
    }
  ];
}

function generalInformation(): InsuranceMap {
  return {
    status: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    patientName: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    patientDob: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    subscriberName: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    subscriberDob: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    subscriberId: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    insuranceName: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    insuranceMailingAddress: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    payerId: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    groupNameNumber: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    groupNumber: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    annualMaximum: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    maximumUsed: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    deductibleInd: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtInd: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    deductibleFamily: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    deductibleMetAmtFamily: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    missingToothClause: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    waitingPeriods: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    calendarOrBenefitYear: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    inNetwork: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    preventiveDeductedFromMaximum: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    feeSchedule: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    }
  };
}

function categories(): InsuranceMap {
  return {
    '01001999': {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    20002699: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    27002899: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    29002999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    30003999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    40004999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    50005899: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    60006199: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    62006999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    70007999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    80008999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    },
    90009999: {
      key: '',
      label: '',
      required: true,
      type: '',
      value: '',
    }
  };
}
