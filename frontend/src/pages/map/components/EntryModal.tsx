import React, { useEffect } from 'react';

import { Modal } from '../../../components';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEntryModal } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { formatDistance, formatEntryType, formatSplit, formatTime } from '../../../utils/dataFormatters';
import { formatDate } from '../../../utils/date';
import { hideModal, showModal } from '../../../utils/modal';
import {EntryType} from "../../../common/types";

// A simple hack to show the current position instead of an entry
export const ENTRY_MODAL_CURRENT_POSITION_ID = -999999999;

const ENTRY_MODAL_ID = 'entry_modal_id';

export const EntryModal = () => {
  const { entries, entryModal, distanceCompleted, distanceRemaining } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Weird hack...
    if (entryModal) {
      showModal(ENTRY_MODAL_ID);
    }
  }, [entryModal]);

  if (entryModal === null) {
    return;
  }

  if (entryModal === ENTRY_MODAL_CURRENT_POSITION_ID) {
    return (
      <Modal id={ENTRY_MODAL_ID}>
        <h3 className="font-bold text-lg">
          Nåværende position
        </h3>
        <div className="flex flex-col pt-4 space-y-6">
          <div className="flex flex-col space-y-2">
            {distanceCompleted && (
              <p>Fullført distanse: {formatDistance(distanceCompleted)}</p>
            )}
            {distanceRemaining && (
              <p>Gjenværende distanse: {formatDistance(distanceRemaining)}</p>
            )}
            {distanceCompleted && distanceRemaining && (
              <p>Fullført: {(distanceCompleted / distanceRemaining).toFixed(2)}%</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <p>Antall innlegg: {entries.length}</p>
            <p>Antall løpeturer: {entries.filter(entry => entry.type === EntryType.RUN).length}</p>
            <p>Antall gåturer: {entries.filter(entry => entry.type === EntryType.WALK).length}</p>
            <p>Antall mølleøkter: {entries.filter(entry => entry.type === EntryType.TREADMILL).length}</p>
          </div>
          <div className="flex flex-row mt-4 justify-end">
            <button
              className="btn"
              onClick={() => {
                dispatch(setEntryModal(null));
                hideModal(ENTRY_MODAL_ID);
              }}
            >
              Lukk
            </button>
          </div>
        </div>
      </Modal>
    );
  } // {formatDistance(distanceCompleted)} / {formatDistance(distanceRemaining)}

  const entry = entries.find((entry) => entry.id === entryModal);
  if (!entry) {
    return null;
  }

  return (
    <Modal id={ENTRY_MODAL_ID}>
      <h3 className="font-bold text-lg">
      {formatEntryType(entry.type)} - {formatDate(new Date(entry.runDate))}
      </h3>
      <div className="flex flex-col pt-4">
        <div className="flex flex-col space-y-2">
          <p>Distanse: {formatDistance(entry.runDistance)}</p>
          <p>Tid: {formatTime(entry.runTime)}</p>
          <p>Split: {formatSplit({ distance: entry.runDistance, time: entry.runTime })}</p>
          {entry.comment !== null && (
            <div className="py-2">
              <p>Kommentar:</p>
              <div className="flex flex-col space-y-2 py-2 px-2 border-[1px] rounded mt-2">
                {entry.comment
                  .split(/\r?\n/)
                  .filter((line) => line.length > 0)
                  .map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row mt-4 justify-end">
          <button
            className="btn"
            onClick={() => {
              dispatch(setEntryModal(null));
              hideModal(ENTRY_MODAL_ID);
            }}
          >
            Lukk
          </button>
        </div>
      </div>
    </Modal>
  );
};
