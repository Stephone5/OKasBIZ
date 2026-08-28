// Master source list. Each page names only the sources it actually uses,
// so the notes panel on a page describes that page rather than the site.

export const LAST_UPDATED = 'August 27, 2026';

export const SOURCES = {
  acfr: {
    label: 'Government finances',
    text:
      'State of Oklahoma Annual Comprehensive Financial Report, FY2024 (Office of Management & Enterprise Services) — Statement of Net Position and Statement of Activities, fiscal year ended June 30, 2024. FY2025 has not been published.',
  },
  budget: {
    label: 'Budget',
    text: 'Oklahoma Policy Institute, FY2026 Budget Highlights; HB 2766 and HB 2764.',
  },
  economy: {
    label: 'Economy',
    text:
      'U.S. Bureau of Economic Analysis (state GDP and by-industry, 2025, released April 2026); Oklahoma Energy Resources Board; U.S. Energy Information Administration; Oklahoma Department of Commerce; USDA; U.S. Census (exports, 2024).',
  },
  tribal: {
    label: 'Tribal economy',
    text: 'United for Oklahoma economic-impact report, 2023 data.',
  },
  population: {
    label: 'Migration & population',
    text:
      'U.S. Census Bureau, Vintage 2025 population estimates — components of change, July 1 2024 to July 1 2025. IRS/Census county-to-county flows (2022–23) for the origin-state figures only. Oklahoma Council of Public Affairs; Federal Reserve Bank of Kansas City.',
  },
  jobs: {
    label: 'Jobs & enterprise',
    text:
      'U.S. Bureau of Labor Statistics (Southwest region, 2025); U.S. Chamber of Commerce; Global Entrepreneurship Monitor; Oklahoma Department of Commerce.',
  },
  households: {
    label: 'Households',
    text:
      'Census ACS and SAIPE; USDA and Feeding America (food insecurity); National Low Income Housing Coalition and Oklahoma Housing Needs Assessment 2024; HUD AHAR and the Oklahoma City point-in-time count; Federal Reserve.',
  },
  health: {
    label: 'Health & education',
    text: "America's Health Rankings; Commonwealth Fund; WalletHub; NAEP.",
  },
  justice: {
    label: 'Justice',
    text:
      'Bureau of Justice Statistics; Prison Policy Initiative; Vera Institute; Oklahoma Watch.',
  },
  land: {
    label: 'Land & property',
    text:
      'Oklahoma Tax Commission, Ad Valorem Division — 2024 gross assessed valuation by county, divided by county land area.',
  },
  elections: {
    label: 'Elections',
    text:
      'Oklahoma State Election Board, 2026 statutory election dates and deadlines. Oklahoma Legislature public legislator lookup.',
  },
  atlas: {
    label: 'OKC Metro',
    text:
      'Compiled from public research across the nine highway-bounded quadrants. Safety grades come from commercial aggregators rather than the Oklahoma City Police Department.',
  },
  local: {
    label: 'Local recirculation',
    text:
      'Institute for Local Self-Reliance, "The Economics of Local"; American Independent Business Alliance. Multiplier figures are ranges rather than point estimates.',
  },
};

// Notes that apply everywhere.
export const GLOBAL_NOTES = [
  {
    title: 'On correlation',
    text:
      'This site does not draw causal conclusions between any two metrics. Where a relationship between data points appears, it is presented as correlation only. No figure here is offered as the cause of another.',
  },
  {
    title: 'On missing figures',
    text:
      'Where something was never published, this site says so rather than guessing. A missing figure is never rendered as zero and never averaged around.',
  },
];

// Named plainly for the band under the hero — who the figures come from,
// not where they live.
export const TICKER_SOURCES = [
  'U.S. Census Bureau',
  'Bureau of Economic Analysis',
  'Bureau of Labor Statistics',
  'Oklahoma Annual Comprehensive Financial Report',
  'Oklahoma Tax Commission',
  'Oklahoma Policy Institute',
  'United for Oklahoma',
  'Federal Reserve Bank of Kansas City',
  'Oklahoma State Election Board',
  'Prison Policy Initiative',
  "America's Health Rankings",
  'U.S. Energy Information Administration',
];
