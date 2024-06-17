import { LatLng } from '../common/types';
import { degreesToRadians, radiansToDegrees } from './radians';

export const calculateBearing = (params: { from: LatLng; to: LatLng }) => {
  const { from, to } = params;

  const deltaLon = degreesToRadians(to.lng) - degreesToRadians(from.lng);

  const x = Math.sin(deltaLon) * Math.cos(degreesToRadians(to.lat));
  const y =
    Math.cos(degreesToRadians(from.lat)) * Math.sin(degreesToRadians(to.lat)) -
    Math.sin(degreesToRadians(from.lat)) * Math.cos(degreesToRadians(to.lat)) * Math.cos(deltaLon);

  const initialBearing = Math.atan2(x, y);
  const bearingDegrees = radiansToDegrees(initialBearing);

  // Normalize
  return (bearingDegrees + 360) % 360;
};
