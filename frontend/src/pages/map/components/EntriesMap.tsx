import { Map, useMap } from '@vis.gl/react-google-maps';
import React, { useEffect } from 'react';

import data from '../../../data/data.json';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setEntryModal } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';

export const EntriesMap = () => {
  const { entries, fragments, currentPosition } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  const dispatch = useAppDispatch();
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

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
