'use client';

import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import AddMarkers from '../../api/maps/AddMarkers';
import { Project } from '../../types/schema';
import './styles.css';
import { CSSProperties } from 'react';

const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0px',
  left: '0px',
};

const center = {
  lat: 43.0481,
  lng: -76.1474,
};

const mapId = '54eb1c7baba5a715'; // needed for AdvancedMarker

export default function Map({
  projects,
  selectedProjectId,
  setSelectedProjectId,
}: {
  projects: Project[] | null;
  selectedProjectId: number | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
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
        <AddMarkers
          projects={projects}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
      </GoogleMap>
    </APIProvider>
  );
}
