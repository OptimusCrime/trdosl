import React from 'react';

import {Entry} from "../../../common/types";
import {Modal} from "../../../components";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {setEntryModal} from "../../../store/reducers/globalReducer";
import {ReducerNames} from "../../../store/reducers/reducerNames";
import {formatDistance, formatEntryType, formatSplit, formatTime} from "../../../utils/dataFormatters";
import {formatDate} from "../../../utils/date";
import {hideModal} from "../../../utils/modal";

export const ENTRY_MODAL_ID = 'entry_modal_id';

interface EntryModalProps {
  entries: Entry[];
}

export const EntryModal = (props: EntryModalProps) => {
  const { entries } = props;

  return (
    <Modal id={ENTRY_MODAL_ID}>
      <EntryModalInner entries={entries}/>
    </Modal>
  );
}

const EntryModalInner = (props: EntryModalProps) => {
  const { entries } = props;

  const dispatch = useAppDispatch();

  const { entryModal } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  if (entryModal === null) {
    return;
  }

  const entry = entries.find(entry => entry.id === entryModal);
  if (!entry) {
    return null;
  }

  return (
    <div>
      <h3 className="font-bold text-lg">{formatEntryType(entry.type)} - {formatDate(new Date(entry.runDate))}</h3>
      <div className="flex flex-col pt-4">
        <div className="flex flex-col space-y-2">
          <p>Distanse: {formatDistance(entry.runDistance)}</p>
          <p>Tid: {formatTime(entry.runTime)}</p>
          <p>Split: {formatSplit({ distance: entry.runDistance, time: entry.runTime})}</p>
          <div className="py-2">
            <p>Kommentar:</p>
            <div className="flex flex-col space-y-2 py-2 px-2 border-[1px] rounded mt-2">
              {entry.comment === null
                ? (<p><i>Ingen kommentar</i></p>)
                : entry.comment
                  .split(/\r?\n/)
                  .filter(line => line.length > 0)
                  .map((line, idx) => <p key={idx}>{line}</p>)
              }
            </div>
          </div>
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
    </div>
  );
}
