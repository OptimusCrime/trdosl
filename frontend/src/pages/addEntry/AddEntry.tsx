import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { usePostEntry } from '../../api/queries/entries';
import { queryKeys } from '../../api/queries/queryKeys';
import { EntryType } from '../../common/types';
import { CheckIcon, XIcon } from '../../icons';
import { formatEntryType } from '../../utils/dataFormatters';
import { addLeadingZero, addLeadingZeroString, MONTHS } from '../../utils/date';
import { toUppercaseFirst } from '../../utils/strings';
import { URLS } from '../../utils/urls';
import { AddEntryWrapper } from './components';

const DEFAULT_TYPE = EntryType.RUN;

// Work smarter, not harder
const DATE_YEAR_OPTIONS = [new Date().getFullYear() - 1, new Date().getFullYear(), new Date().getFullYear() + 1];

const DEFAULT_TIME_HOURS = '00';
const DEFAULT_TIME_MINUTES = '25';
const DEFAULT_TIME_SECONDS = '00';

const DEFAULT_DATE_DAY = addLeadingZero(new Date().getDate());
const DEFAULT_DATE_MONTH = addLeadingZero(new Date().getMonth() + 1);
const DEFAULT_DATE_YEAR = new Date().getFullYear().toString();

const DEFAULT_DISTANCE_KM = '5';
const DEFAULT_DISTANCE_DM = '00';

export const AddEntry = () => {
  const postEntry = usePostEntry();
  const queryClient = useQueryClient();
  const history = useHistory();

  // This is pretty stupid
  const [saved, setSaved] = useState<boolean>(false);
  const [type, setType] = useState<EntryType>(EntryType.RUN);

  const [dateDay, setDateDay] = useState<string>(DEFAULT_DATE_DAY);
  const [dateMonth, setDateMonth] = useState<string>(DEFAULT_DATE_MONTH);
  const [dateYear, setDateYear] = useState<string>(DEFAULT_DATE_YEAR);

  const [timeHours, setTimeHours] = useState<string>(DEFAULT_TIME_HOURS);
  const [timeMinutes, setTimeMinutes] = useState<string>(DEFAULT_TIME_MINUTES);
  const [timeSeconds, setTimeSeconds] = useState<string>(DEFAULT_TIME_SECONDS);

  const [distanceKm, setDistanceKm] = useState<string>(DEFAULT_DISTANCE_KM);
  const [distanceDm, setDistanceDm] = useState<string>(DEFAULT_DISTANCE_DM);

  const [comment, setComment] = useState<string>('');

  const addCallback = () => {
    postEntry.mutate(
      {
        date: `${dateYear}-${dateMonth}-${dateDay}`,
        type: type,
        runTime: `${timeHours}:${timeMinutes}:${timeSeconds}`,
        runDistance: parseInt(distanceKm) * 1000 + parseInt(distanceDm) * 10,
        comment: comment.length === 0 ? null : comment,
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: queryKeys.entries,
          });

          setSaved(true);
        },
      },
    );
  };

  if (saved) {
    return (
      <AddEntryWrapper>
        <div className="flex flex-col space-y-4 max-w-[600px] w-full mx-auto">
          <div className="flex self-center w-full pt-4 px-4">
            <div role="alert" className="alert alert-success">
              <div>
                <CheckIcon />
              </div>
              <div className="flex flex-col space-y-2">
                <span>Innlegget er lagret.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button className="btn btn-primary" onClick={() => history.push(URLS.MAP)}>
              Tilbake til kart
            </button>
          </div>
        </div>
      </AddEntryWrapper>
    );
  }

  return (
    <AddEntryWrapper>
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
              <option value={EntryType.TREADMILL}>{formatEntryType(EntryType.TREADMILL)}</option>
              <option value={EntryType.WALK}>{formatEntryType(EntryType.WALK)}</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Dato</span>
          </label>
          <div className="flex flex-row justify-between items-center max-w-[350px]">
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_DATE_DAY}
              onChange={(e) => setDateDay(addLeadingZeroString(e.target.value))}
            >
              {Array.from(Array(32).keys())
                .filter((value) => value !== 0)
                .map((value) => (
                  <option key={`date_day_${value}`} value={addLeadingZero(value)}>
                    {`${value}.`}
                  </option>
                ))}
            </select>
            <div className="flex">-</div>
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_DATE_MONTH}
              onChange={(e) => setDateMonth(addLeadingZeroString(e.target.value))}
            >
              {Array.from(Array(13).keys())
                .filter((value) => value !== 0)
                .map((value) => (
                  <option key={`date_month_${value}`} value={addLeadingZero(value)}>
                    {toUppercaseFirst(MONTHS[value - 1])}
                  </option>
                ))}
            </select>
            <div className="flex">-</div>
            <select
              className="select select-bordered max-w-xs"
              defaultValue={DEFAULT_DATE_YEAR}
              onChange={(e) => setDateYear(e.target.value)}
            >
              {DATE_YEAR_OPTIONS.map((value) => (
                <option key={`date_year_${value}`} value={value}>
                  {value}
                </option>
              ))}
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
          <textarea
            className="textarea textarea-bordered h-24 text-base"
            onChange={(e) => setComment(e.target.value)}
          />
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
    </AddEntryWrapper>
  );
};
