import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';

import { EntriesMap, EntryModal } from './components';

export const Map = () => (
  <>
    <EntryModal />
    <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
      <div className="w-full flex flex-col space-y-8">
        <APIProvider apiKey={process.env.MAPS_API_KEY ?? ''}>
          <EntriesMap />
        </APIProvider>
      </div>
    </div>
  </>
);
