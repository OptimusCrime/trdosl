import {Entry, LatLng} from "../common/types";

export interface LineBuilderFragment {
  points: LatLng[];
  entry: Entry | null;
  currentPosition: boolean;
}
