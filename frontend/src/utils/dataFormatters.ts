import { EntryType } from '../common/types';
import { addLeadingZero } from './date';

export const formatEntryType = (type: EntryType): string => {
  switch (type) {
    case EntryType.WALK:
      return 'Gåtur';
    case EntryType.TREADMILL:
      return 'Mølle';
    default:
    case EntryType.RUN:
      return 'Løpetur';
  }
};

export const formatDistance = (value: number): string => {
  if (value < 1000) {
    return `${value} m`;
  }

  const remained = value % 1000;
  if (remained === 0) {
    return `${value / 1000} km`;
  }

  return `${Number(value / 1000).toFixed(2)} km`;
};

export const formatTime = (time: string): string => {
  const split = time.split(':');

  if (split.length !== 3) {
    // This should theoretically never happen
    return time;
  }

  // Hide hour if we run under an hour
  if (split[0] === '00') {
    return `${split[1]}:${split[2]}`;
  }

  // Ran for more than an hour
  return `${split[0]}:${split[1]}:${split[2]}`;
};

export const formatSplit = (params: { time: string; distance: number }): string => {
  // This is probably a pretty stupid way to calculate this...
  const { time, distance } = params;
  const totalSeconds = getTotalSeconds(time);
  const secondsPerMeter = totalSeconds / distance;
  const secondsPerKilometer = secondsPerMeter * 1000;

  const minutes = Math.floor(secondsPerKilometer / 60);
  const seconds = secondsPerKilometer - minutes * 60;

  return `${addLeadingZero(minutes)}:${addLeadingZero(Math.round(seconds))}`;
};

const getTotalSeconds = (time: string): number => {
  const split = time.split(':');

  if (split.length !== 3) {
    // This should theoretically never happen
    return 0;
  }

  return parseInt(split[0]) * (60 * 60) + parseInt(split[1]) * 60 + parseInt(split[2]);
};
