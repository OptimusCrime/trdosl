import { Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

import { Entry, EntryType } from '../../../common/types';
import data from '../../../data/data.json';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEntryModal } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';

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
      url: 'https://trdosl.optimuscrime.net/static/markers/me.png',
      scaledSize: new coreLib.Size(40, 51),
    };

    const runningIcon: google.maps.Icon = {
      url: 'https://trdosl.optimuscrime.net/static/markers/running.png',
      scaledSize: new coreLib.Size(40, 51),
    };

    const treadmillIcon: google.maps.Icon = {
      url: 'https://trdosl.optimuscrime.net/static/markers/treadmill.png',
      scaledSize: new coreLib.Size(40, 51),
    };

    const walkingIcon: google.maps.Icon = {
      url: 'https://trdosl.optimuscrime.net/static/markers/walking.png',
      scaledSize: new coreLib.Size(40, 51),
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
        const marker = new google.maps.Marker({
          position: fragment.points[0],
          map: map,
          icon: getIcon(fragment.entry),
        });

        marker.addListener('click', () => {
          if (fragment.entry === null) {
            return;
          }

          dispatch(setEntryModal(fragment.entry.id));
        });
      }

      path.setMap(map);
    }

    new google.maps.Marker({
      position: currentPosition,
      title: 'Current position',
      map: map,
      icon: meIcon,
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
      defaultCenter={data[0]}
      defaultZoom={11}
      gestureHandling="greedy"
      disableDefaultUI={true}
    />
  );
};
