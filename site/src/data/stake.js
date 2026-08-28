// The homepage argument, in the order it should be scanned.
//
// Every per-resident figure is a plain division of a published total by the
// Census Vintage 2025 population of Oklahoma (4,123,288). Nothing is modelled
// or estimated. The divisor is stated on the page so the arithmetic is
// checkable.

export const POPULATION = 4123288;
export const POPULATION_LABEL = '4,123,288 residents';

// The everyday purchases that make the point. Ordinary, unpolitical, and
// the kind of spending nobody thinks of as investing.
// Everyday prices in Oklahoma.
//
// Rent and tuition are Oklahoma-specific published figures. BLS publishes
// no state-level average prices for groceries or fuel — only the South
// Census Region, which is the geography containing Oklahoma — so those four
// are regional. Each item carries its own geography and date on the page.
export const LINE_ITEMS = [
  { item: 'Eggs',    unit: 'a dozen',  price: '$2.21',  where: 'South region, Jul 2026' },
  { item: 'Bread',   unit: 'a loaf',   price: '$1.75',  where: 'South region, Jul 2026' },
  { item: 'Milk',    unit: 'a gallon', price: '$4.00',  where: 'South region, Jul 2026' },
  { item: 'Gas',     unit: 'a gallon', price: '$3.67',  where: 'South region, Jul 2026' },
  { item: 'Rent',    unit: 'a month',  price: '$1,014', where: 'Oklahoma median' },
  { item: 'Tuition', unit: 'a year',   price: '$8,519', where: 'Oklahoma public 4-year' },
];

export const LINE_ITEMS_SOURCE =
  'Rent is the Oklahoma median gross rent (U.S. Census Bureau, American Community Survey 2020–2024). Tuition is the Oklahoma average for in-state undergraduates at public four-year institutions (National Center for Education Statistics, Digest of Education Statistics table 330.20, 2022–23). Groceries and fuel are Bureau of Labor Statistics average prices for the South Census Region, urban, July 2026 — BLS does not publish these at state level, and the South region is the geography that contains Oklahoma.';


export const STAKE = [
  {
    n: 51779, prefix: '$',
    value: '$51,779',
    label: 'of what Oklahoma makes in a year',
    working:
      'Oklahoma produced $213.5 billion in 2025. Divide that by everyone who lives here and this is your share of it.',
    series: 2,
  },
  {
    n: 31528, prefix: '$',
    value: '$31,528',
    label: 'moving through Oklahoma households each year',
    working:
      'Households here spend about $130 billion a year. Divide that by everyone who lives here and this is what runs through the average person.',
    series: 3,
  },
  {
    n: 8270, prefix: '$',
    value: '$8,270',
    label: 'of what the state is worth once its debts are paid',
    working:
      'The state owns $34.1 billion more than it owes. Divide that by everyone who lives here and this is your share of it.',
    series: 1,
  },
];
