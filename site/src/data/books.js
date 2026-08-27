// Government-wide statement of net position, June 30, 2024, and the
// FY2024 statement of activities. ACFR FY2024. Figures in $ billions.

export const BALANCE = {
  caption: 'What the state owns, what it owes, and what is left',
  rows: [
    {
      label: 'What it owns',
      sub: 'Cash, roads, buildings, land, investments',
      value: 46.29,
      display: '$46.29B',
      series: 1,
    },
    {
      label: 'What it owes',
      sub: 'Debt, pensions, current liabilities',
      value: 12.93,
      display: '$12.93B',
      series: 6,
    },
    {
      label: 'What is left',
      sub: 'Net position — owns minus owes',
      value: 34.08,
      display: '$34.08B',
      series: 2,
      emphasis: true,
    },
  ],
  source: 'ACFR FY2024, Statement of Net Position.',
};

export const YEAR = {
  caption: 'The year itself',
  rows: [
    {
      label: 'Came in',
      sub: 'Taxes, fees, federal grants',
      value: 33.29,
      display: '$33.29B',
      series: 1,
    },
    {
      label: 'Went out',
      sub: 'Health, education, transport, safety',
      value: 31.45,
      display: '$31.45B',
      series: 6,
    },
    {
      label: 'Left over',
      sub: 'Surplus kept for the year',
      value: 1.84,
      display: '+$1.84B',
      series: 2,
      emphasis: true,
    },
  ],
  source: 'ACFR FY2024, Statement of Activities.',
};
