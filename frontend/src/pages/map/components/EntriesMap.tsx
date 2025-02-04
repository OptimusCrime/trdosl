import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

import data from '../../../data/data.json';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEntryModal } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { ENTRY_MODAL_CURRENT_POSITION_ID } from './EntryModal';

const MARKERS_BASE_URL = 'https://trdosl.optimuscrime.net/static/markers/';

export const EntriesMap = () => {
  const { entries, fragments, currentPosition, hideFace } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const dispatch = useAppDispatch();
  const map = useMap();
  const coreLib = useMapsLibrary('core');

  // This is stupid, but I could not figure out another way of doing this
  const [initializedMap, setInitializedMap] = useState<boolean>(false);
  const [meMarker, setMeMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !coreLib) {
      return;
    }

    const meIcon: google.maps.Icon = {
      url: `${MARKERS_BASE_URL}/me.png`,
      scaledSize: new coreLib.Size(50, 64),
    };

    for (const fragment of fragments) {
      const path = new google.maps.Polyline({
        path: fragment.points,
        geodesic: true,

        // Green color if the fragment has been completed, red otherwise
        strokeColor: fragment.entry ? '#3cd22b' : '#d22b2b',
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      path.setMap(map);
    }

    if (!meMarker) {
      const currentPositionMarker = new google.maps.Marker({
        position: currentPosition,
        title: 'Nåværende posisjon',
        map: map,
        icon: meIcon,
        visible: !hideFace,
      });

      setMeMarker(currentPositionMarker);

      currentPositionMarker.addListener('click', () => {
        dispatch(setEntryModal(ENTRY_MODAL_CURRENT_POSITION_ID));
      });
    } else {
      meMarker.setVisible(!hideFace);
    }

    // Set the default position to where we currently are on the road
    if (currentPosition && !initializedMap) {
      map.setCenter(currentPosition);
    }

    setInitializedMap(true);
  }, [map, entries, hideFace]);

  return (
    <Map
      style={{
        width: '100%',
        height: 'calc(100vh - 4rem)',
      }}
      defaultCenter={{ lat: data[0][0], lng: data[1][1] }}
      defaultZoom={11}
      gestureHandling="greedy"
      disableDefaultUI={true}
    />
  );
};
