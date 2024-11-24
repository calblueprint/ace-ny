import { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Cluster, MarkerClusterer } from '@googlemaps/markerclusterer';
import { useMap } from '@vis.gl/react-google-maps';
import { ClusterIcon } from '@/assets/Clusters/icons';
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
    map?.panTo(position); // change center of map to selected marker
    if (selectedProjectId === projectId) {
      document.title = 'ACE NY';
    }
  };

  const closeModal = () => {
    document.title = 'ACE NY';
    setSelectedProjectId(null); // close modal
  };

  const clusterer = useMemo(() => {
    if (!map) return null;

    const renderer = {
      render(cluster: Cluster) {
        const count = cluster.markers?.length ?? 0;
        const position = cluster.position;

        // create a container for the custom icon
        const container = document.createElement('div');
        const root = ReactDOM.createRoot(container);
        root.render(<ClusterIcon count={count} />);

        return new google.maps.marker.AdvancedMarkerElement({
          position: position,
          content: container,
        });
      },
    };

    const clusterHandler = (
      event: google.maps.MapMouseEvent,
      cluster: Cluster,
      map: google.maps.Map,
    ) => {
      if (event.latLng) {
        const mapZoom = (map.getZoom() ?? 0) + 4;
        map.setCenter(event.latLng);
        map.setZoom(mapZoom);
      }
    };

    const setClusterer = new MarkerClusterer({
      map,
      renderer,
      onClusterClick: clusterHandler,
    });

    return setClusterer;
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
            technology={project.renewable_energy_technology}
            projectId={project.id}
            onMarkerClick={handleMarkerClick}
            clusterer={clusterer}
            selectedProjectId={selectedProjectId}
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
