import {LatLng} from "../common/types";

export const calculateDistance = (params: {from: LatLng; to: LatLng; }): number => {
  const { from, to } = params;
  const r = 6371000; // meters
  const p = Math.PI / 180;

  // I don't even
  // Stolen from: https://stackoverflow.com/a/21623206
  const a = 0.5 - Math.cos((to.lat - from.lat) * p) / 2
    + Math.cos(from.lat * p) * Math.cos(to.lat * p) *
    (1 - Math.cos((to.lng - from.lng) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}
