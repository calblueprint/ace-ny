import { useMemo, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { useMap } from '@vis.gl/react-google-maps';
import ProjectModal from '@/components/ProjectModal';
import { Project } from '../../types/schema';
import { MarkerInfoWindow } from './MarkerInfoWindow';

export default function AddMarker({
  projects,
}: {
  projects: Project[] | null;
}) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  ); // track currently open modal
  const map = useMap();

  const handleMarkerClick = (
    projectId: number,
    position: { lat: number; lng: number },
  ) => {
    setSelectedProjectId(prevId => (prevId === projectId ? null : projectId)); // close modal if same, open if different
    map && map.panTo(position); // change center of map to selected marker
  };

  const closeModal = () => {
    setSelectedProjectId(null); // close modal
  };

  const clusterer = useMemo(() => {
    if (!map) return null;

    return new MarkerClusterer({ map });
  }, [map]);

  return (
    <>
      {projects?.map((project: Project) => {
        return (
          <MarkerInfoWindow
            key={project.id}
            position={{
              lat: project.latitude,
              lng: project.longitude,
            }}
            projectName={project.project_name}
            projectDev={project.developer}
            technology={project.renewable_energy_technology}
            projectId={project.id}
            onMarkerClick={handleMarkerClick}
            clusterer={clusterer}
          />
        );
      })}

      {selectedProjectId && (
        <ProjectModal
          project_id={selectedProjectId}
          closeModal={closeModal}
          openFirst={true}
        />
      )}
    </>
  );
}
