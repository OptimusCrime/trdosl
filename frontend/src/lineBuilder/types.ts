import { Entry, LatLng } from '../common/types';

export interface LineBuilderFragment {
  points: LatLng[];
  distance: number;
  entry: Entry | null;
  currentPosition: boolean;
}
