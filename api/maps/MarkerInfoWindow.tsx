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

  // open infowindow when marker is hovered and not already open
  const handleMarkerEnter = useCallback(() => {
    if (!infoWindowShown) {
      setInfoWindowShown(true);
    }
  }, [infoWindowShown]);

  // close infowindow when modal is closed
  const handleClose = useCallback(() => {
    if (!modalOpen) {
      setInfoWindowShown(false);
    }
  }, [modalOpen]);

  const handleMarkerClick = () => {
    onMarkerClick(projectId, position);
    setModalOpen(!modalOpen);

    // toggle infowindow when marker is clicked
    if (!modalOpen) {
      setInfoWindowShown(true);
    } else {
      setInfoWindowShown(false);
    }
  };

  useEffect(() => {
    // close infowindow and modal if new marker is clicked
    if (selectedProjectId !== projectId) {
      setInfoWindowShown(false);
      setModalOpen(false);
    }
  }, [selectedProjectId]);

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
