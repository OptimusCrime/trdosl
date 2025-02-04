import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Entry } from '../../../common/types';
import data from '../../../data/data.json';
import { buildFragments } from '../../../lineBuilder';
import { LocalStorageKeys, setItem } from '../../../utils/localStorage';
import { parseFragmentData } from '../../../utils/parseFragmentData';
import { ReducerNames } from '../reducerNames';
import { getInitialState } from './state';

const globalReducer = createSlice({
  name: ReducerNames.GLOBAL,
  initialState: getInitialState(),
  reducers: {
    setEntries(state, action: PayloadAction<{ entries: Entry[] }>) {
      state.entries = action.payload.entries;

      const fragments = buildFragments({
        entries: action.payload.entries,
        points: data.map((entry) => ({ lat: entry[0], lng: entry[1] })),
      });

      state.fragments = fragments;

      const { currentPosition, distanceRemaining, distanceCompleted } = parseFragmentData(fragments);

      state.distanceRemaining = distanceRemaining;
      state.distanceCompleted = distanceCompleted;
      state.distanceTotal = distanceRemaining + distanceCompleted;
      state.currentPosition = currentPosition;
    },
    setEntryModal(state, action: PayloadAction<number | null>) {
      state.entryModal = action.payload;
    },
    toggleHideFace(state) {
      const newValue = !state.hideFace;
      state.hideFace = newValue;

      setItem(LocalStorageKeys.HIDE_FACE, newValue ? 'true' : 'false');
    },
  },
});

export const { setEntryModal, setEntries, toggleHideFace } = globalReducer.actions;

export default globalReducer.reducer;
