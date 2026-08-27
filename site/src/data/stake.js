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
export const LINE_ITEMS = [
  'Groceries',
  'Gas',
  'Tithe',
  'Rent',
  'Tuition',
  'Diapers',
  'Feed',
  'Coffee',
];

export const STAKE = [
  {
    value: '$51,779',
    label: 'of what Oklahoma makes in a year — your share of it',
    working: '$213.5 billion, the state economy in 2025, split across everyone who lives here',
    series: 2,
  },
  {
    value: '$31,528',
    label: 'runs through Oklahoma households every year, per person',
    working: 'About $130 billion that households spend, split across everyone who lives here',
    series: 3,
  },
  {
    value: '$8,270',
    label: 'of what the state is worth — your share of it',
    working: '$34.1 billion, what the state owns after debts, split across everyone who lives here',
    series: 1,
  },
];
