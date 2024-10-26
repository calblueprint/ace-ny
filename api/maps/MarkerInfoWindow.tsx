import { useCallback, useState } from 'react';
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
}: {
  position: { lat: number; lng: number };
  projectId: number;
  projectName: string;
  projectDev: string;
  onMarkerClick: (
    projectId: number,
    position: { lat: number; lng: number },
  ) => void;
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // clicking the marker will toggle the infowindow
  const handleMarkerEnter = useCallback(
    () => setInfoWindowShown(isShown => !isShown),
    [],
  );

  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={position}
        onMouseEnter={handleMarkerEnter}
        onMouseLeave={handleClose}
        onClick={() => onMarkerClick(projectId, position)}
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
