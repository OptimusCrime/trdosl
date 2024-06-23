import { LatLng } from '../common/types';
import { LineBuilderFragment } from '../lineBuilder/types';

export const parseFragmentData = (
  fragments: LineBuilderFragment[],
): {
  currentPosition: LatLng;
  distanceCompleted: number;
  distanceRemaining: number;
} => {
  let distanceCompleted = 0;
  let distanceRemaining = 0;

  let currentPosition = fragments[0].points[0];

  for (const fragment of fragments) {
    if (fragment.entry) {
      distanceCompleted += fragment.distance;
    } else {
      distanceRemaining = fragment.distance;
    }

    if (fragment.currentPosition) {
      if (fragment.entry === null) {
        // If we're starting, then we should use the very first point, and not the last
        currentPosition = fragment.points[0];
      } else {
        currentPosition = fragment.points[fragment.points.length - 1];
      }
    }
  }

  return {
    currentPosition,
    distanceCompleted,
    distanceRemaining,
  };
};
