import { GlobalState } from './types';

const fallbackInitialState: GlobalState = {
  entryModal: null,
};

export const getInitialState = (): GlobalState => {
  return fallbackInitialState;
};
