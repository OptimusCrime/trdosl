import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useAuth } from '../../api/queries/auth';
import { useDeleteEntry } from '../../api/queries/entries';
import { queryKeys } from '../../api/queries/queryKeys';
import { useAppSelector } from '../../store/hooks';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { formatDistance, formatEntryType, formatSplit, formatTime } from '../../utils/dataFormatters';
import { formatDate } from '../../utils/date';

export const Entries = () => {
  const { entries } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const queryClient = useQueryClient();
  const deleteEntry = useDeleteEntry();
  const auth = useAuth();

  const deleteCallback = (id: number) => {
    deleteEntry.mutate(id, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.entries,
        });
      },
    });
  };

  // Newest first
  const sortedEntries = entries.slice(0).sort((a, b) => new Date(b.runDate).getTime() - new Date(a.runDate).getTime());

  return (
    <div className="container mx-auto my-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex mx-auto">
          <div className="mx-4 card bg-neutral text-neutral-content card-compact w-full">
            <div className="card-body flex">
              <h4 className="text-3xl pb-2">Innlegg</h4>
              <div className="flex flex-col">
                {sortedEntries.map((entry) => (
                  <div className="p-4 rounded-lg border-2 border-base-100 mb-4 flex flex-col" key={entry.id}>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">
                        {formatEntryType(entry.type)} - {formatDate(new Date(entry.runDate))}
                      </h3>
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
                    {auth.data && (
                      <div className="flex flex-row justify-end mt-2">
                        <button
                          className="btn btn-primary"
                          disabled={deleteEntry.isLoading}
                          onClick={() => deleteCallback(entry.id)}
                        >
                          {deleteEntry.isLoading ? <span className="loading loading-spinner"></span> : 'Slett'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
