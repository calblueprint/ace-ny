import { useCallback, useEffect, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

export const MarkerInfoWindow = ({
  position,
  projectId,
  projectName,
  projectDev,
  onMarkerClick,
  clusterer,
}: {
  position: { lat: number; lng: number };
  projectId: number;
  projectName: string;
  projectDev: string;
  onMarkerClick: (projectId: number) => void;
  clusterer: MarkerClusterer | null;
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // hovering over the marker will toggle the infowindow
  const handleMarkerEnter = useCallback(() => {
    setInfoWindowShown(isShown => !isShown);
  }, []);

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  const handleMarkerClick = () => {
    onMarkerClick(projectId);
  };

  useEffect(() => {
    if (marker && clusterer) {
      clusterer.addMarker(marker);
    }
  });

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onMouseEnter={handleMarkerEnter}
        onMouseLeave={handleClose}
        onClick={handleMarkerClick}
      />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} disableAutoPan={true}>
          <h2>{projectName}</h2>
          <p>Developer: {projectDev}</p>
        </InfoWindow>
      )}
    </>
  );
};
