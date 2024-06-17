import {Entry, LatLng} from "../common/types";
import {calculateDistance} from "../utils/calculateDistance";
import {calculateIntermediatePoint} from "../utils/calculateIntermediatePoint";
import {LatLngIterator} from "./LatLngIterator";
import {LineBuilderFragment} from "./types";

export const buildFragments = (params: {
  entries: Entry[];
  points: LatLng[];
}): LineBuilderFragment[] => {
  const {entries, points} = params;

  // Sort the entries from oldest to newest, working our way from the start to the end
  const sortedEntries = entries.sort((a, b) => new Date(a.runDate).getTime() - new Date(b.runDate).getTime());
  const entriesNum = sortedEntries.length;

  // Iterating stuff is confusing af, so use this simple iterator instead
  const it = new LatLngIterator(points);

  const fragments: LineBuilderFragment[] = [];

  // Create fragments for each entry
  for (let i = 0; i < entriesNum; i++) {
    const entry = entries[i];

    const points = constructFragments({
      targetDistance: entry.runDistance,
      iterator: it,
    })

    fragments.push({
      points: points,
      entry: entry,
      currentPosition: i === (entriesNum - 1),
    });
  }

  // Create fragment for the remaining line

  fragments.push({
    points: constructFragments({
      targetDistance: null,
      iterator: it,
    }),
    entry: null,

    // If we have zero entries, then we're at the start
    currentPosition: entriesNum === 0,
  });

  return fragments;
}

const constructFragments = (params: {
  targetDistance: number | null;
  iterator: LatLngIterator;
}): LatLng[] => {
  const {targetDistance, iterator: it} = params;

  const output: LatLng[] = [];

  let totalDistance = 0;

  while (it.hasNext()) {
    const stepDistance = calculateDistance({
      from: it.get(),
      to: it.get(1)
    });

    // Check if the total distance exceeds the distance for this fragment
    if (targetDistance === null || ((stepDistance + totalDistance) <= targetDistance)) {
      // Distance not exceeded. Handle next point.

      // 1. Increase the distance
      totalDistance += stepDistance;

      // 2. Add the point to the list of points
      output.push(it.get());

      // 3. Forward the iterator
      it.goForwards();

      continue;
    }

    // The distance between the current and next point exceeds the distance for this fragment. We have to create an
    // intermediate point, and continue from there.

    // 1. Add the current point to the list of points in this fragment
    output.push(it.get());

    // 2. Calculate the position of the intermediate point, between the current and next point, using the
    //    remaining distance.
    const intermediatePoint = calculateIntermediatePoint({
      from: it.get(),
      to: it.get(1),
      distance: targetDistance - totalDistance,
    });

    // 3. Insert the new intermediate point into the iterator, so that the intermediate point can also be used
    //    as the initial point for the next fragment.
    it.insert(intermediatePoint);

    // 4. Advance the iterator one step, so that the current point is not evaluated twice
    it.goForwards();

    // 5. Add the intermediate point to the list of points in this fragment
    output.push(intermediatePoint);
    break;
  }

  return output;
}
