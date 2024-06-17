import React, {useEffect} from 'react';

import {useDeleteEntry, useEntries} from "../../api/queries/entries";
import data from "../../data/data.json";
import {ErrorIcon} from "../../icons";
import {buildFragments} from "../../lineBuilder";
import {useAppDispatch} from "../../store/hooks";
import {setDistances} from "../../store/reducers/globalReducer";
import {formatDistance, formatSplit, formatTime} from "../../utils/dataFormatters";
import {URLS} from "../../utils/urls";

export const Entries = () => {
  const dispatch = useAppDispatch();
  const entries = useEntries();
  const deleteEntry = useDeleteEntry();

  const deleteCallback = (id: number) => {
    deleteEntry.mutate(id, {
      onSuccess: () => {
        // Lol (I am lazy)
        window.location.replace(URLS.ENTRIES);
      }
    });
  }

  useEffect(() => {
    if (!entries.isSuccess) {
      return;
    }

    // We don't really need to do this, but I messed up some stuff, so here we are
    const fragments = buildFragments({
      entries: entries.data,
      points: data,
    });


    // Calculate the progress (this will be displayed in the header)
    let completedDistance = 0;
    let remainingDistance = 0;
    for (const fragment of fragments) {
      if (fragment.entry) {
        completedDistance += fragment.distance;
      } else {
        remainingDistance = fragment.distance;
      }
    }

    // Set the progress
    dispatch(setDistances({
      remaining: remainingDistance,
      completed: completedDistance
    }));
  }, [entries]);

  if (entries.isLoading) {
    return (
      <div className="flex flex-col w-full items-center h-[calc(50vh-2rem)] justify-end">
        <span className="loading loading-spinner loading-lg"></span>
        <div className="pt-10 text-center px-10">
          <span>Revurderer om dette var en god idé...</span>
        </div>
      </div>
    );
  }

  if (entries.isError) {
    return (
      <div className="flex flex-col w-full items-center h-[calc(50vh-2rem)] justify-end">
        <div className="flex self-center w-full max-w-2xl pt-4 px-4">
          <div role="alert" className="alert alert-error">
            <div>
              <ErrorIcon/>
            </div>
            <div className="flex flex-col space-y-2">
              <span>Kunne ikke laste innleggene dine</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Newest first
  const sortedEntries = entries.data.sort((a, b) => new Date(b.runDate).getTime() - new Date(a.runDate).getTime());

  return (
    <div className="container mx-auto mt-4">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex mx-auto">
          <div className="mx-4 card bg-neutral text-neutral-content card-compact w-full">
            <div className="card-body flex">
              <h4 className="text-3xl pb-2">Innlegg</h4>
              <div className="flex flex-col">
                {sortedEntries.map(entry => (
                  <div className="p-4 rounded-lg border-2 border-base-100 mb-4 flex flex-col" key={entry.id}>
                    <div className="space-y-2">
                      <p>Distanse: {formatDistance(entry.runDistance)}</p>
                      <p>Tid: {formatTime(entry.runTime)}</p>
                      <p>Split: {formatSplit({distance: entry.runDistance, time: entry.runTime})}</p>
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
                    <div className="flex flex-row justify-end mt-2">
                      <button className="btn btn-primary" disabled={deleteEntry.isLoading} onClick={() => deleteCallback(entry.id)}>
                        {deleteEntry.isLoading ? <span className="loading loading-spinner"></span> : 'Slett'}
                      </button>
                    </div>
                  </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
