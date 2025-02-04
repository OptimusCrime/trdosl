import { Entry, LatLng } from '../../../common/types';
import { LineBuilderFragment } from '../../../lineBuilder/types';

export interface GlobalState {
  entries: Entry[];
  fragments: LineBuilderFragment[];
  currentPosition: LatLng | null;
  distanceCompleted: number | null;
  distanceRemaining: number | null;
  distanceTotal: number | null;
  entryModal: number | null;
  hideFace: boolean;
}
