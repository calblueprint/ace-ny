import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  AdvancedMarker,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { MarkerInfoWindowText1 } from '@/styles/texts';
import energyStorage from '../../assets/Custom-Markers/energy_storage.svg';
import geothermal from '../../assets/Custom-Markers/geothermal.svg';
import hydroelectric from '../../assets/Custom-Markers/hydroelectric.svg';
import landbased_wind from '../../assets/Custom-Markers/landbased_wind.svg';
import offshore_wind from '../../assets/Custom-Markers/offshore_wind.svg';
import pumped_storage from '../../assets/Custom-Markers/pumped_storage.svg';
import solarPower from '../../assets/Custom-Markers/solar_power.svg';
import { Project } from '../../types/schema';
import { InfoWindowStyle } from './style';

const technologyToPin: Record<string, string> = {
  'Energy Storage': energyStorage,
  Geothermal: geothermal,
  Hydroelectric: hydroelectric,
  'Land-Based Wind': landbased_wind,
  'Offshore Wind': offshore_wind,
  'Pumped Storage': pumped_storage,
  'Solar PV': solarPower,
  Solar: solarPower,
};

export const MarkerInfoWindow = ({
  position,
  projectId,
  projectName,
  technology,
  onMarkerClick,
  selectedProjectId,
  markerMap,
  filteredProjects,
}: {
  position: { lat: number; lng: number };
  projectId: number;
  projectName: string;
  technology: string;
  onMarkerClick: (
    projectId: number,
    position: { lat: number; lng: number },
  ) => void;
  selectedProjectId: number | null;
  markerMap: Map<number, google.maps.Marker>;
  filteredProjects: Project[] | null;
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // open infowindow when marker is hovered and not already open
  const handleMarkerEnter = useCallback(() => {
    if (!infoWindowShown) {
      setInfoWindowShown(true);
    }
  }, [infoWindowShown]);

  // close infowindow when modal is closed
  const handleClose = useCallback(() => {
    if (selectedProjectId !== projectId) {
      setInfoWindowShown(false);
    }
  }, [projectId, selectedProjectId]);

  const handleMarkerClick = () => {
    onMarkerClick(projectId, position);

    // toggle infowindow when marker is clicked
    if (selectedProjectId === null) {
      setInfoWindowShown(true);
    } else {
      setInfoWindowShown(false);
    }
  };

  // hide infowindow if marker is not in filtered projects
  useEffect(() => {
    const isInFiltered = filteredProjects?.some(p => p.id === projectId);
    if (!isInFiltered) {
      setInfoWindowShown(false);
    }
  }, [filteredProjects, projectId]);

  useEffect(() => {
    // close infowindow and modal if new marker is clicked
    if (selectedProjectId !== projectId) {
      setInfoWindowShown(false);
    } else {
      setInfoWindowShown(true);
    }
  }, [selectedProjectId, projectId]);

  useEffect(() => {
    // add project id and marker to markerMap when visible and remove when component unmounts
    if (marker) {
      markerMap.set(projectId, marker as unknown as google.maps.Marker);
    }

    return () => {
      if (marker) {
        markerMap.delete(projectId);
      }
    };
  }, [marker, projectId, markerMap]);

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
            style={{ width: '80%' }}
          />
        ) : (
          <Pin />
        )}
      </AdvancedMarker>
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          pixelOffset={[-5, 0]}
          onClose={handleClose}
          disableAutoPan={true}
          style={InfoWindowStyle}
          headerDisabled={true}
        >
          <MarkerInfoWindowText1>{projectName}</MarkerInfoWindowText1>
        </InfoWindow>
      )}
    </>
  );
};
