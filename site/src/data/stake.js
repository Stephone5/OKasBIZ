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
