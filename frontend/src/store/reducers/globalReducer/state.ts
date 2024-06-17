import { GlobalState } from './types';

const fallbackInitialState: GlobalState = {
  entryModal: null,
  distanceCompleted: null,
  distanceRemaining: null,
};

export const getInitialState = (): GlobalState => {
  return fallbackInitialState;
};
