import { getItem, LocalStorageKeys } from '../../../utils/localStorage';
import { GlobalState } from './types';

const fallbackInitialState: GlobalState = {
  entries: [],
  fragments: [],
  currentPosition: null,
  distanceCompleted: null,
  distanceRemaining: null,
  distanceTotal: null,
  entryModal: null,
  hideFace: getItem(LocalStorageKeys.HIDE_FACE, 'false') === 'true',
};

export const getInitialState = (): GlobalState => {
  return fallbackInitialState;
};
