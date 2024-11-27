import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

import { Entry, EntryType } from '../../../common/types';
import data from '../../../data/data.json';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEntryModal } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { formatEntryType } from '../../../utils/dataFormatters';
import { formatDate } from '../../../utils/date';
import { ENTRY_MODAL_CURRENT_POSITION_ID } from './EntryModal';

const MARKERS_BASE_URL = 'https://trdosl.optimuscrime.net/static/markers/';

export const EntriesMap = () => {
  const { entries, fragments, currentPosition } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const dispatch = useAppDispatch();
  const map = useMap();
  const coreLib = useMapsLibrary('core');

  useEffect(() => {
    if (!map || !coreLib) {
      return;
    }

    const meIcon: google.maps.Icon = {
      url: `${MARKERS_BASE_URL}/me.png`,
      scaledSize: new coreLib.Size(50, 64),
    };

    const runningIcon: google.maps.Icon = {
      url: `${MARKERS_BASE_URL}/running.png`,
      scaledSize: new coreLib.Size(50, 64),
    };

    const treadmillIcon: google.maps.Icon = {
      url: `${MARKERS_BASE_URL}/treadmill.png`,
      scaledSize: new coreLib.Size(50, 64),
    };

    const walkingIcon: google.maps.Icon = {
      url: `${MARKERS_BASE_URL}/walking.png`,
      scaledSize: new coreLib.Size(50, 64),
    };

    const getIcon = (entry: Entry): google.maps.Icon => {
      switch (entry.type) {
        case EntryType.TREADMILL:
          return treadmillIcon;
        case EntryType.WALK:
          return walkingIcon;
        case EntryType.RUN:
        default:
          return runningIcon;
      }
    };

    for (const fragment of fragments) {
      const path = new google.maps.Polyline({
        path: fragment.points,
        geodesic: true,

        // Use a random color if the polyline is for an entry. The remaining line should always be red
        strokeColor: fragment.entry ? '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0') : '#d22b2b',
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      if (fragment.entry) {
        const { entry, points } = fragment;

        const marker = new google.maps.Marker({
          position: points[0],
          map: map,
          icon: getIcon(entry),
          title: `${formatEntryType(entry.type)} - ${formatDate(new Date(entry.runDate))}`,
        });

        marker.addListener('click', () => {
          if (entry === null) {
            return;
          }

          dispatch(setEntryModal(entry.id));
        });
      }

      path.setMap(map);
    }

    const currentPositionMarker = new google.maps.Marker({
      position: currentPosition,
      title: 'Nåværende posisjon',
      map: map,
      icon: meIcon,
    });

    currentPositionMarker.addListener('click', () => {
      dispatch(setEntryModal(ENTRY_MODAL_CURRENT_POSITION_ID));
    });

    // Set the default position to where we currently are on the road
    if (currentPosition) {
      map.setCenter(currentPosition);
    }
  }, [map, entries]);

  return (
    <Map
      style={{
        width: '100%',
        height: 'calc(100vh - 4rem)',
      }}
      defaultCenter={{lat: data[0][0], lng: data[1][1]}}
      defaultZoom={11}
      gestureHandling="greedy"
      disableDefaultUI={true}
    />
  );
};
