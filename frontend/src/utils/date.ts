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

export const addLeadingZero = (value: number): string => value < 10 ? `0${value}` : `${value}`;

export const formatDate = (date: Date): string =>
  `${WEEKDAYS[date.getDay()]} ${date.getDate()}. ${MONTHS[date.getMonth() - 1]} ${date.getFullYear()} @ ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
