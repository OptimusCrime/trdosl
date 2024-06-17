import { LatLng } from '../common/types';
import { calculateBearing } from './calculateBearing';
import { degreesToRadians, radiansToDegrees } from './radians';

export const calculateIntermediatePoint = (params: { from: LatLng; to: LatLng; distance: number }): LatLng => {
  const { from, to, distance } = params;

  const bearing = calculateBearing({
    from: from,
    to: to,
  });

  const R = 6371000;

  const latRadians = degreesToRadians(from.lat);
  const lngRadians = degreesToRadians(from.lng);

  const bearingRadians = degreesToRadians(bearing);

  const latEnd = Math.asin(
    Math.sin(latRadians) * Math.cos(distance / R) +
      Math.cos(latRadians) * Math.sin(distance / R) * Math.cos(bearingRadians),
  );
  const lngEnd =
    lngRadians +
    Math.atan2(
      Math.sin(bearingRadians) * Math.sin(distance / R) * Math.cos(latRadians),
      Math.cos(distance / R) - Math.sin(latRadians) * Math.sin(latEnd),
    );

  return {
    lat: radiansToDegrees(latEnd),
    lng: radiansToDegrees(lngEnd),
  };
};
