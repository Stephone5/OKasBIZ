// Government-wide statement of net position, June 30, 2024, and the
// FY2024 statement of activities. ACFR FY2024. Figures in $ billions.

export const BALANCE = {
  caption: 'Assets, liabilities and equity',
  rows: [
    {
      label: 'Assets',
      sub: 'Cash, roads, buildings, land, investments',
      value: 46.29,
      display: '$46.29B',
      series: 1,
    },
    {
      label: 'Liabilities',
      sub: 'Debt, pensions, current liabilities',
      value: 12.93,
      display: '$12.93B',
      series: 6,
    },
    {
      label: 'Equity',
      sub: 'Net position — assets minus liabilities',
      value: 34.08,
      display: '$34.08B',
      series: 2,
      emphasis: true,
    },
  ],
  source: 'ACFR FY2024, Statement of Net Position.',
};

export const YEAR = {
  caption: 'Profit and loss',
  rows: [
    {
      label: 'Profit',
      sub: 'Taxes, fees, federal grants',
      value: 33.29,
      display: '$33.29B',
      series: 1,
    },
    {
      label: 'Expenses',
      sub: 'Health, education, transport, safety',
      value: 31.45,
      display: '$31.45B',
      series: 6,
    },
    {
      label: 'Net income',
      sub: 'Surplus kept for the year',
      value: 1.84,
      display: '+$1.84B',
      series: 2,
      emphasis: true,
    },
  ],
  source: 'ACFR FY2024, Statement of Activities.',
};
