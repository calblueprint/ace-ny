import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import energyStorage from '../../assets/Custom-Markers/energy_storage.svg';
import geothermal from '../../assets/Custom-Markers/geothermal.svg';
import hydroelectric from '../../assets/Custom-Markers/hydroelectric.svg';
import landbased_wind from '../../assets/Custom-Markers/landbased_wind.svg';
import offshore_wind from '../../assets/Custom-Markers/offshore_wind.svg';
import pumped_storage from '../../assets/Custom-Markers/pumped_storage.svg';
import solarPower from '../../assets/Custom-Markers/solar_power.svg';

const technologyToPin: Record<string, string> = {
  'Energy Storage': energyStorage,
  Geothermal: geothermal,
  Hydroelectric: hydroelectric,
  'Land Based Wind': landbased_wind,
  'Offshore Wind': offshore_wind,
  'Pumped Storage': pumped_storage,
  Solar: solarPower,
};

export const MarkerInfoWindow = ({
  position,
  projectId,
  projectName,
  projectDev,
  technology,
  onMarkerClick,
  clusterer,
}: {
  position: { lat: number; lng: number };
  projectId: number;
  projectName: string;
  projectDev: string;
  technology: string;
  onMarkerClick: (
    projectId: number,
    position: { lat: number; lng: number },
  ) => void;
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
    onMarkerClick(projectId, position);
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
      >
        {technology in technologyToPin ? (
          <Image
            src={technologyToPin[technology]}
            alt={`Marker pin for ${technology}`}
          />
        ) : (
          <Pin />
        )}
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} disableAutoPan={true}>
          <h2>{projectName}</h2>
          <p>Developer: {projectDev}</p>
        </InfoWindow>
      )}
    </>
  );
};
