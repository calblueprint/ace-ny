'use client';

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import AddMarkers from '../../api/maps/AddMarkers';
import { Project } from '../../types/schema';
import './styles.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 43.0481,
  lng: -76.1474,
};

const mapId = '54eb1c7baba5a715'; // needed for AdvancedMarker

export default function Map(props: { projects: Project[] | null }) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <GoogleMap
        style={containerStyle}
        defaultCenter={center}
        defaultZoom={7}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={mapId}
        mapTypeId={'roadmap'}
        clickableIcons={false}
      >
        <AddMarkers projects={props.projects} />
      </GoogleMap>
    </APIProvider>
  );
}
