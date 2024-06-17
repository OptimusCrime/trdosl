import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import { ReducerNames } from '../reducerNames';
import { getInitialState } from './state';

const globalReducer = createSlice({
  name: ReducerNames.GLOBAL,
  initialState: getInitialState(),
  reducers: {
    resetState(_state) {
      _state = getInitialState();
    },
    setEntryModal(state, action: PayloadAction<number | null>) {
      state.entryModal = action.payload;
    },
  },
});

export const {
  resetState,
  setEntryModal,
} = globalReducer.actions;

export default globalReducer.reducer;
