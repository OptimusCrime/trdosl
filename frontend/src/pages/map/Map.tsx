import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';

import { useEntries } from '../../api/queries/entries';
import { ErrorIcon } from '../../icons';
import { EntriesMap, EntryModal } from './components';

export const Map = () => {
  const entries = useEntries();

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
              <ErrorIcon />
            </div>
            <div className="flex flex-col space-y-2">
              <span>Kunne ikke laste innleggene dine</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <EntryModal entries={entries.data} />
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
        <div className="w-full flex flex-col space-y-8">
          <APIProvider apiKey={process.env.MAPS_API_KEY ?? ''}>
            <EntriesMap entries={entries.data} />
          </APIProvider>
        </div>
      </div>
    </>
  );
};
