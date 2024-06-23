import { GlobalState } from './types';

const fallbackInitialState: GlobalState = {
  entries: [],
  fragments: [],
  currentPosition: null,
  distanceCompleted: null,
  distanceRemaining: null,
  entryModal: null,
};

export const getInitialState = (): GlobalState => {
  return fallbackInitialState;
};
