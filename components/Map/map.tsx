'use client';

import { useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import addMarker from '../../api/maps/addMarker';
import { Project } from '../../types/helper';

const containerStyle = {
  width: '700px',
  height: '700px',
};

const center = {
  lat: 40.7128,
  lng: -74.006,
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

  console.log('hiii: ', props.projects);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {addMarker(props.projects)}
      <Marker position={{ lat: 40.7128, lng: -74.006 }}></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}
