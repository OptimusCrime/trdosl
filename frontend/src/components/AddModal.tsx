import React, { useState } from 'react';

import { usePostEntry } from '../api/queries/entries';
import { EntryType } from '../common/types';
import { XIcon } from '../icons';
import { formatEntryType } from '../utils/dataFormatters';
import { addLeadingZero } from '../utils/date';
import { URLS } from '../utils/urls';
import { Modal } from './Modal';

export const ADD_MODAL_ID = 'add_modal_id';

const DEFAULT_TYPE = EntryType.RUN;

const DEFAULT_TIME_HOURS = '00';
const DEFAULT_TIME_MINUTES = '25';
const DEFAULT_TIME_SECONDS = '00';

const DEFAULT_DISTANCE_KM = '5';
const DEFAULT_DISTANCE_DM = '00';

export const AddModal = () => {
  const postEntry = usePostEntry();

  // This is pretty stupid
  const [type, setType] = useState<EntryType>(EntryType.RUN);

  const [timeHours, setTimeHours] = useState<string>(DEFAULT_TIME_HOURS);
  const [timeMinutes, setTimeMinutes] = useState<string>(DEFAULT_TIME_MINUTES);
  const [timeSeconds, setTimeSeconds] = useState<string>(DEFAULT_TIME_SECONDS);

  const [distanceKm, setDistanceKm] = useState<string>(DEFAULT_DISTANCE_KM);
  const [distanceDm, setDistanceDm] = useState<string>(DEFAULT_DISTANCE_DM);

  const [comment, setComment] = useState<string>('');

  const addCallback = () => {
    postEntry.mutate(
      {
        type: type,
        runTime: `${timeHours}:${timeMinutes}:${timeSeconds}`,
        runDistance: parseInt(distanceKm) * 1000 + parseInt(distanceDm) * 10,
        comment: comment.length === 0 ? null : comment,
      },
      {
        onSuccess: async () => {
          // Fix this in the future. Needs ref to the form components zzzz
          window.location.replace(URLS.MAP);
        },
      },
    );
  };

  return (
    <Modal id={ADD_MODAL_ID}>
      <h3 className="font-bold text-lg">Legg til</h3>
      <div className="flex flex-col space-y-4 pt-2">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <div className="flex">
            <select
              className="select select-bordered w-full max-w-lg"
              defaultValue={DEFAULT_TYPE}
              onChange={(e) => setType(e.target.value as EntryType)}
            >
              <option value={EntryType.RUN}>{formatEntryType(EntryType.RUN)}</option>
              <option value={EntryType.THREADMILL}>{formatEntryType(EntryType.THREADMILL)}</option>
              <option value={EntryType.WALK}>{formatEntryType(EntryType.WALK)}</option>
            </select>
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Tid</span>
          </label>
          <div className="flex flex-row justify-between items-center max-w-[300px]">
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_TIME_HOURS}
              onChange={(e) => setTimeHours(e.target.value)}
            >
              {Array.from(Array(100).keys()).map((value) => (
                <option key={`hours_${value}`} value={addLeadingZero(value)}>
                  {addLeadingZero(value)}
                </option>
              ))}
            </select>
            <div className="flex">:</div>
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_TIME_MINUTES}
              onChange={(e) => setTimeMinutes(e.target.value)}
            >
              {Array.from(Array(60).keys()).map((value) => (
                <option key={`minutes_${value}`} value={addLeadingZero(value)}>
                  {addLeadingZero(value)}
                </option>
              ))}
            </select>
            <div className="flex">:</div>
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_TIME_SECONDS}
              onChange={(e) => setTimeSeconds(e.target.value)}
            >
              {Array.from(Array(60).keys()).map((value) => (
                <option key={`seconds_${value}`} value={addLeadingZero(value)}>
                  {addLeadingZero(value)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Distanse</span>
          </label>
          <div className="flex flex-row justify-between items-center max-w-[187px]">
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_DISTANCE_KM}
              onChange={(e) => setDistanceKm(e.target.value)}
            >
              {Array.from(Array(100).keys()).map((value) => (
                <option key={`hours_${value}`} value={`${value}`}>{`${value}`}</option>
              ))}
            </select>
            <div className="flex">.</div>
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_DISTANCE_DM}
              onChange={(e) => setDistanceDm(e.target.value)}
            >
              {Array.from(Array(100).keys()).map((value) => (
                <option key={`minutes_${value}`} value={value}>
                  {addLeadingZero(value)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Kommentar</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" onChange={(e) => setComment(e.target.value)} />
        </label>
        <div className="w-full flex justify-end">
          <button className="btn btn-primary" disabled={postEntry.isLoading} onClick={addCallback}>
            {postEntry.isLoading ? <span className="loading loading-spinner"></span> : 'Legg til'}
          </button>
        </div>
        {postEntry.isError && (
          <div role="alert" className="alert alert-error">
            <XIcon />
            <span>Kunne ikke legge til innlegg.</span>
          </div>
        )}
      </div>
    </Modal>
  );
};
