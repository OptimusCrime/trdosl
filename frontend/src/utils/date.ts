export const WEEKDAYS = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];

export const MONTHS = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];

export const addLeadingZero = (value: number): string => (value < 10 ? `0${value}` : `${value}`);
export const addLeadingZeroString = (value: string): string => (value.length === 1 ? `0${value}` : `${value}`);

export const formatDate = (date: Date): string =>
  `${WEEKDAYS[date.getDay()]} ${date.getDate()}. ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
