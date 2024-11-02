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
  selectedProjectId,
}: {
  position: { lat: number; lng: number };
  projectId: number;
  projectName: string;
  projectDev: string;
  onMarkerClick: (
    projectId: number,
    position: { lat: number; lng: number },
  ) => void;
  clusterer: MarkerClusterer | null;
  selectedProjectId: number | null;
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  // hovering over the marker will toggle the infowindow
  const handleMarkerEnter = useCallback(() => {
    if (!infoWindowShown) {
      setInfoWindowShown(true);
    }
  }, []);

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => {
    console.log('modalOpen in close: ', modalOpen);
    if (!modalOpen) {
      setInfoWindowShown(false);
    }
  }, [modalOpen]);

  const handleMarkerClick = () => {
    onMarkerClick(projectId, position);
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setInfoWindowShown(true);
    } else {
      setInfoWindowShown(false);
    }
  };

  useEffect(() => {
    // Close InfoWindow if another marker is selected
    if (selectedProjectId !== projectId) {
      setInfoWindowShown(false);
    }
    console.log(selectedProjectId, projectId);
    console.log(infoWindowShown);
  }, [selectedProjectId, projectId]);

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
