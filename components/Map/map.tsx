'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import addMarker from '../../api/maps/addMarker';
import { Project } from '../../types/schema';

const containerStyle = {
  width: '700px',
  height: '700px',
};

const center = {
  lat: 43.0481,
  lng: -76.1474,
};

const zoom = 7;

export default function Map(props: { projects: Project[] | null }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter(center);
    map.setZoom(zoom);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {addMarker(props.projects)}
    </GoogleMap>
  ) : (
    <></>
  );
}
