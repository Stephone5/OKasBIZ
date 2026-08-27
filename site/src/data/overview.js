// Overview figures — carried across from the published site unchanged.
// Nothing here is estimated or filled in; a missing value stays missing.

// Colour on these tiles encodes the group, so it carries information
// rather than decorating. Group order maps to --series-1 … --series-5.
export const GLANCE_GROUPS = [
  { key: 'gov',        label: 'Government',  series: 1 },
  { key: 'economy',    label: 'Economy',     series: 2 },
  { key: 'people',     label: 'People',      series: 3 },
  { key: 'households', label: 'Households',  series: 4 },
  { key: 'outcomes',   label: 'Outcomes',    series: 5 },
];

export const GLANCE = [
  { group: 'gov',        value: '$34.1B',  label: 'Government net position', meta: 'FY2024',                 delta: 'up',   deltaText: '5.9% year over year' },
  { group: 'gov',        value: '$12.08B', label: 'Appropriated budget',     meta: 'FY2026',                 delta: 'down', deltaText: '11.8% vs FY2000, real per-capita' },
  { group: 'gov',        value: '$2.31B',  label: 'Total state savings',     meta: 'Rainy-day cushion' },
  { group: 'economy',    value: '$213.5B', label: 'State GDP',               meta: '2025',                   delta: 'up',   deltaText: '1.5% real growth' },
  { group: 'economy',    value: '23%',     label: 'Economy from oil & gas',  meta: '$60.3B in activity' },
  { group: 'economy',    value: '#3',      label: 'US wind-power producer',  meta: 'Behind Texas and Iowa' },
  { group: 'economy',    value: '$23.4B',  label: 'Tribal-nation output',    meta: 'About 8% of state GDP' },
  { group: 'people',     value: '+22,912', label: 'Net migration',           meta: '2024–25',                delta: 'up',   deltaText: 'About 63 people a day' },
  { group: 'people',     value: '3.8%',    label: 'Unemployment',            meta: '2025',                   delta: 'up',   deltaText: 'Below the US rate of 4.3%' },
  { group: 'households', value: '−43.7%',  label: 'Household savings',       meta: '2019–23',                delta: 'down', deltaText: 'Second-largest decline in the US' },
  { group: 'outcomes',   value: '50th',    label: 'Public-education ranking',meta: '49th in per-pupil spend' },
  { group: 'outcomes',   value: '#4',      label: 'Incarceration rate, US',  meta: '905 per 100k, all forms' },
];

// Strict like-for-like: same metric, same year, same source.
export const VS_US = [
  { metric: 'Unemployment (U-3)',                 ok: '3.8%',    us: '4.3%',    gap: '−0.5 pt',  better: true,  source: 'BLS · 2025' },
  { metric: 'Underemployment (U-6)',              ok: '7.2%',    us: '8.0%',    gap: '−0.8 pt',  better: true,  source: 'BLS · 2025' },
  { metric: 'Per-capita personal income',         ok: '$62,661', us: '$72,425', gap: '−13.5%',   better: false, source: 'BEA · 2024' },
  { metric: 'Uninsured rate',                     ok: '11.5%',   us: '8.0%',    gap: '+3.5 pt',  better: false, source: 'Census · 2024' },
  { metric: 'Life expectancy',                    ok: '72.8 yrs',us: '78.4 yrs',gap: '−5.6 yrs', better: false, source: 'CDC · 2023' },
  { metric: 'Incarceration, all forms per 100k',  ok: '905',     us: '664',     gap: '+36%',     better: false, source: 'Prison Policy Initiative · 2024' },
];

export const VS_US_NOTE =
  'Where a clean same-year, same-source national figure could not be confirmed — median household income and food insecurity among them — the metric appears elsewhere as Oklahoma-only rather than forced into an unfair comparison. Gap is Oklahoma minus the United States, in points or percent difference.';

// Live spending estimate. Derived, labelled as an estimate, no backend.
export const SPEND = {
  perSecond: 4122,
  perYearText: 'about $130 billion',
  note:
    'Oklahoma households collectively generate roughly $130 billion in personal consumption expenditure each year — about $4,122 every second. This counter tracks estimated spending since the page opened.',
  source: 'BEA Regional Economic Accounts',
};
