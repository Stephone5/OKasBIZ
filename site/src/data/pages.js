// Page content carried across from the published site. Every figure here
// already appeared there, sourced. Nothing has been re-derived or filled in.

/* ─────────────────────────── THE BOOKS ─────────────────────────── */

export const NET_POSITION_SPLIT = [
  { label: 'Tied up in roads and buildings', sub: 'Capital assets net of debt — cannot be sold', value: 13.4, display: '$13.4B', series: 1 },
  { label: 'Legally restricted',             sub: 'Designated for specific purposes',          value: 9.2,  display: '$9.2B',  series: 2 },
  { label: 'Genuinely unrestricted',         sub: 'Available for general purposes',            value: 11.4, display: '$11.4B', series: 3 },
];

export const APPROPRIATIONS = [
  { label: 'Education',            sub: '48% of everything appropriated', value: 5.76, display: '$5.76B', series: 1 },
  { label: 'Health & social',      sub: '19%',                            value: 2.32, display: '$2.32B', series: 2 },
  { label: 'Public safety',        sub: 'Approximate',                    value: 1.40, display: '~$1.40B', series: 3 },
  { label: 'Transportation',       sub: 'Approximate',                    value: 0.80, display: '~$0.80B', series: 5 },
  { label: 'Everything else',      sub: 'Approximate',                    value: 1.80, display: '~$1.80B', series: 6 },
];

export const RESERVES = [
  ['Constitutional Rainy Day Fund', '$1.33B'],
  ['Revenue Stabilization Fund', '$425M'],
  ['Total state savings', '$2.31B'],
  ['Combined governmental fund balance', '$18.4B'],
];

/* ─────────────────────────── ECONOMY ─────────────────────────── */

export const ENGINES = [
  { label: 'Oil & gas, total footprint', sub: 'OERB, FY2024',                     value: 60.3, display: '$60.3B', series: 6 },
  { label: 'Aerospace & defense',        sub: '206,000 jobs, anchored by Tinker',  value: 44.0, display: '$44.0B', series: 2 },
  { label: 'Government',                 sub: 'BEA value added',                   value: 32.8, display: '$32.8B', series: 3 },
  { label: 'Real estate',                sub: 'BEA value added',                   value: 23.5, display: '$23.5B', series: 5 },
  { label: 'Tribal nations',             sub: '39 nations, 139,860 jobs',          value: 23.4, display: '$23.4B', series: 1 },
  { label: 'Professional & business',    sub: 'BEA value added',                   value: 22.8, display: '$22.8B', series: 4 },
  { label: 'Agriculture',                sub: 'Top-5 US wheat and cattle',         value: 6.1,  display: '$6.1B',  series: 6 },
];

export const ENGINES_CAVEAT =
  'These figures mix BEA value-added (government, real estate, professional services) with total-activity and impact estimates (oil and gas, aerospace, tribal). They overlap and are not additive. They show relative heft, not a clean breakdown of GDP.';

export const ECONOMY_RANKS = [
  { value: '#6',      label: 'US crude-oil producer',   meta: 'Also a major natural-gas state', group: 'economy' },
  { value: '#3',      label: 'US wind-power producer',  meta: 'About ten times its 2010 output', group: 'economy' },
  { value: '206k',    label: 'Aerospace & defense jobs',meta: "The country's largest air-logistics depot", group: 'economy' },
  { value: '$7.8B',   label: 'Goods exports',           meta: '2024', group: 'economy', delta: 'up', deltaText: '24.9% year over year' },
  { value: '$62,661', label: 'Per-capita income',       meta: '40th in the US', group: 'people' },
  { value: '23%',     label: 'Economy from oil & gas',  meta: 'The swing factor in tax receipts', group: 'economy' },
];

export const VALUE_PER_ACRE = [
  ['Oklahoma County', '$10.92B', '$24,831'],
  ['Tulsa County', '$8.70B', '$23,175'],
  ['Cleveland County', '$3.33B', '$9,508'],
  ['Canadian County', '$2.38B', '$4,170'],
  ['Mayes County', '$1.26B', '$2,967'],
  ['Cimarron County', '$0.07B', '$57'],
];

export const RECIRCULATION = [
  { label: 'Locally-owned business', sub: 'Owners, employees and suppliers all spend locally', value: 48, display: '~48%', series: 1 },
  { label: 'National chain',         sub: 'Profits leave for headquarters; supply chains are centralised', value: 14, display: '~14%', series: 6 },
];

export const IMPORT_GAPS = [
  ['Technology & enterprise software', 'IT infrastructure and digital services for government and business, largely sourced out of state.'],
  ['Medical devices & pharmaceutical distribution', 'Hospital supply chains dominated by out-of-state distributors.'],
  ['Aerospace component manufacturing', "Oklahoma runs the world's largest overhaul operation. Most components are imported."],
  ['Value-added food processing', 'Agricultural output leaves raw. Milling, packaging and specialty foods remain open.'],
  ['Renewable energy components', 'Third in the country for wind. Most turbine and solar components are imported.'],
  ['Professional & consulting services', 'Government and enterprise contracts flow significantly to out-of-state firms.'],
];

/* ─────────────────────────── PEOPLE ─────────────────────────── */

export const MIGRATION = [
  ['Net migration, July 2024 to July 2025', '+22,912'],
  ['From other states', '+14,492'],
  ['From abroad', '+8,420'],
  ['Births over deaths', '+2,559'],
  ['Total population change', '+25,530'],
  ['Population, July 1 2025', '4,123,288'],
];

export const MOMENTUM = [
  {
    value: '63',
    label: 'people chose Oklahoma as home every day',
    body: 'Between July 2024 and July 2025 the state gained a net 22,912 people through migration — 14,492 from other states and 8,420 from abroad. Millennial in-migration ran 53% above out-migration in 2023, and Oklahoma City ranked 8th nationally for millennial moves.',
    source: 'U.S. Census Bureau, Vintage 2025; Oklahoma Council of Public Affairs; Federal Reserve Bank of Kansas City.',
    ref: 'population',
    series: 1,
  },
  {
    value: '1 in 5',
    label: 'working adults started a business in the last two years',
    body: 'About 19% of working adults are new business owners, the highest rate in over two decades, up from 12.8% a decade ago. Oklahoma County alone logged 14,955 new business applications in 2023.',
    source: 'Global Entrepreneurship Monitor; U.S. Chamber of Commerce; BLS Southwest Region, 2025.',
    ref: 'jobs',
    series: 2,
  },
  {
    value: '$23.4B',
    label: "contributed by the state's 39 tribal nations",
    body: 'About 8% of state GDP, supporting an estimated 139,860 jobs and $7.8 billion in wages — growth of $4.9 billion since FY2019. In many rural counties the tribal nation is the largest employer.',
    source: 'United for Oklahoma economic-impact report, 2023 data.',
    ref: 'tribal',
    series: 3,
  },
  {
    value: '206,000',
    label: 'people employed in aerospace and defense',
    body: "An estimated $44 billion in economic activity, anchored by Tinker Air Force Base — the country's largest air-logistics depot — and the state's fastest-growing industry sector.",
    source: 'Oklahoma Aerospace & Defense Initiative; Oklahoma Department of Commerce.',
    ref: 'economy',
    series: 5,
  },
];

/* ─────────────────────────── WORK ─────────────────────────── */

export const WORK_STATS = [
  { value: '3.8%',   label: 'Unemployment, U-3',        meta: '2025 · below the US rate of 4.3%', group: 'people' },
  { value: '7.2%',   label: 'Underemployment, U-6',     meta: 'Against 8.0% nationally', group: 'people' },
  { value: '140k',   label: 'Jobs added, 2019–24',      meta: 'A top-ten state for job creation', group: 'people' },
  { value: '~1 in 5',label: 'Adults are new business owners', meta: 'Highest in over twenty years', group: 'people' },
];

export const JOBLESS = [
  ['Unemployed residents, U-3', '76,800'],
  ['Marginally attached to the labour force', '18,600'],
  ['U-3 unemployment rate', '3.8%'],
  ['U-6 underemployment rate', '7.2%'],
  ['New-business-owner rate', '~19%'],
];

export const PRESSURE = [
  ['Poverty rate', '15.3%'],
  ['Child poverty', '20.5%'],
  ['Food insecurity', '15.4%'],
  ['Uninsured', '11.5%'],
];

export const HOUSING = [
  ['Rental homes short for the lowest-income renters', '~85,000'],
  ['Extremely-low-income renters severely cost-burdened', '70%+'],
  ['Oklahoma City median rent, 2000 to 2018', '$483 → $851'],
];

export const HOMELESSNESS = [
  ['Oklahoma City point-in-time count, 2024', '1,838'],
  ['Change against 2023', '+402 (~28%)'],
  ['Chronically homeless, Oklahoma City', '474 (+17%)'],
  ['Statewide, HUD 2024', '~5,400 (+17%)'],
];

export const SUBSIDY_LEDGER = [
  ['Quality Jobs family of programmes — cash to employers', '~$47–85M'],
  ['Grocery sales-tax repeal — revenue foregone', '~$418M'],
  ['Income-tax cut, HB2764 — revenue foregone, full-year FY27', '~$340M'],
];

export const SUPPORT = [
  {
    title: 'Small Business Development Centers',
    lead: 'Free, one-to-one business advising',
    body: 'Every Oklahoma county is served by an SBDC offering free advising — business plans, financial projections, licensing, market analysis. No cost and no obligation. Search your county name and “SBDC Oklahoma”, or ask at your local chamber of commerce.',
  },
  {
    title: 'Quality Jobs Program',
    lead: 'Up to 5% of new payroll, returned as cash',
    body: "The state's flagship incentive returns a share of new payroll to qualifying employers creating jobs in-state. A 2021 analysis of 2011–18 payouts found $524.8M in rebates generated about $4 billion in added state tax revenue. Your local chamber can tell you whether a business qualifies.",
  },
  {
    title: 'Community Development Financial Institutions',
    lead: "Lending for businesses that don't fit a traditional bank",
    body: 'CDFIs are mission-driven lenders that serve entrepreneurs who do not qualify for conventional financing. They operate throughout Oklahoma. Ask your local bank or chamber which CDFIs serve your area, or visit your county economic development office.',
  },
];

/* ─────────────────────────── WELLBEING ─────────────────────────── */

export const RANKS = [
  { label: 'Public education, overall', rank: 50 },
  { label: 'Per-pupil spending',        rank: 49 },
  { label: 'Teacher pay',               rank: 41 },
  { label: 'Health outcomes, overall',  rank: 47 },
  { label: 'Health care system',        rank: 49 },
  { label: 'Uninsured rate',            rank: 48 },
];

export const JUSTICE = [
  ['State-prison rate, US rank', '#4 · 550 per 100,000'],
  ['All-forms rate', '905 per 100,000'],
  ["Women's incarceration", 'Top 3 · 222 per 100,000'],
  ['Life expectancy', '72.8 years, down from 74.1 in 2020'],
  ['Public safety spending, FY2024', '$1.23B · 3.9% of expenses'],
];

/* ─────────────────────────── YOUR MOVE ─────────────────────────── */

export const PILLARS = [
  {
    title: 'Spend with intention',
    body: 'Money has a geography. A dollar spent at a locally-owned business recirculates further before it leaves. You do not have to change everything you buy. A modest shift, made consistently, compounds.',
    action: 'This week, find one purchase you make regularly and a locally-owned alternative for it.',
    series: 1,
  },
  {
    title: 'Build something',
    body: 'Oklahoma has one of the highest rates of new business formation in the country. If you have seen a gap in your community, that gap is an invitation. The help exists locally and most of it is free.',
    action: 'This week, write down one problem in your community you wish someone would solve. Then ask why it could not be you.',
    series: 2,
  },
  {
    title: 'Show up',
    body: 'The decisions that shape your street, your school and your local business environment are mostly not made in Washington or Oklahoma City. They are made at meetings almost nobody attends.',
    action: 'Find out when your next city council or county commissioner meeting is. Put it on the calendar. Go once.',
    series: 3,
  },
];

export const SESSION_CHANGES = [
  ['K-12 education', '$5.49B', '$5.76B', '+$270M', '2024–25'],
  ['Health & human services', '$5.85B', '$6.31B', '+$460M', '2024–25'],
  ['Transportation', '$1.32B', '$1.45B', '+$130M', '2024–25'],
  ['Top income-tax rate', '4.75%', '4.50%', '−0.25 pts', '2025'],
  ['Three lowest income-tax brackets', 'Active', 'Eliminated', 'Removed', '2025'],
  ['Gross production tax', '$1.57B', '$1.07B', '−$500M', 'Market'],
];

export const ELECTION = [
  ['General election', 'Nov 3, 2026'],
  ['Registration deadline', 'Oct 19, 2026'],
  ['Polls open', '7 a.m. – 7 p.m.'],
  ['Races include', 'Governor, Attorney General, all 101 House seats'],
];
