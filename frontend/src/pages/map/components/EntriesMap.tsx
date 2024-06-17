import {Map, useMap} from "@vis.gl/react-google-maps";
import React, {useEffect} from "react";

import {Entry} from "../../../common/types";
import data from "../../../data/data.json";
import {buildFragments} from "../../../lineBuilder";
import {useAppDispatch} from "../../../store/hooks";
import {setEntryModal} from "../../../store/reducers/globalReducer";
import {showModal} from "../../../utils/modal";
import {ENTRY_MODAL_ID} from "./EntryModal";

interface EntriesMapProps {
  entries: Entry[];
}

export const EntriesMap = (props: EntriesMapProps) => {
  const dispatch = useAppDispatch();

  const {entries} = props;

  const fragments = buildFragments({
    entries: entries,
    points: data,
  });

  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    let currentPosition = fragments[0].points[0];
    for (const fragment of fragments) {
      const path = new google.maps.Polyline({
        path: fragment.points,
        geodesic: true,

        // Use a random color if the polyline is for an entry. The remaining line should always be red
        strokeColor: fragment.entry ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') : '#d22b2b',
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      if (fragment.currentPosition) {
        if (fragment.entry === null) {
          // If we're starting, then we should use the very first point, and not the last
          currentPosition = fragment.points[0];
        }
        else {
          currentPosition = fragment.points[fragment.points.length - 1];
        }
      }

      if (fragment.entry) {
        const marker = new google.maps.Marker({
          position: fragment.points[0],
          title: 'Hello world',
          map: map,
        });

        marker.addListener('click', () => {
          if (fragment.entry === null) {
            return;
          }

          dispatch(setEntryModal(fragment.entry.id));
          showModal(ENTRY_MODAL_ID);
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
    map.setCenter({
      lat: currentPosition.lat,
      lng: currentPosition.lng
    });

  }, [map]);

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
}
