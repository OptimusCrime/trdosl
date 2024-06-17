import {EntryType} from "../common/types";
import {addLeadingZero} from "./date";

export const formatEntryType = (type: EntryType): string => {
  switch (type) {
    case EntryType.WALK:
      return "Gåtur";
    case EntryType.THREADMILL:
      return "Mølle";
    default:
    case EntryType.RUN:
      return "Løpetur";
  }
}

export const formatDistance = (value: number): string => {
  if (value < 1000) {
    return `${value} m`;
  }

  const remained = value % 1000;
  if (remained === 0) {
    return `${value / 1000} km`;
  }

  return `${Number(value / 1000).toFixed(2)} km`;
}

export const formatSplit = (params: { time: string; distance: number}): string => {
  // This is probably a pretty stupid way to calculate this...
  const { time, distance } = params;
  const totalSeconds = getTotalSeconds(time);
  const secondsPerMeter = totalSeconds / distance;
  const secondsPerKilometer = secondsPerMeter * 1000;

  const minutes = Math.floor(secondsPerKilometer / 60);
  const seconds = secondsPerKilometer - (minutes * 60);

  return `${addLeadingZero(minutes)}:${addLeadingZero(Math.round(seconds))}`;
}

const getTotalSeconds = (time: string): number => {
  const split = time.split(':');

  // Just seconds
  if (split.length === 1) {
    return parseInt(split[0]);
  }

  // Minutes and seconds
  if (split.length === 2) {
    return (parseInt(split[0]) * 60) + parseInt(split[1]);
  }

  // Hours, minutes and seconds
  if (split.length === 3) {
    return (parseInt(split[0]) * (60 * 60)) + (parseInt(split[1]) * 60) + parseInt(split[2]);
  }

  // What have you done...?
  return 0;
}
