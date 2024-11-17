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

  const getMinZoom = function (numMarkers: number, mapZoom: number): number {
    if (numMarkers === 2) {
      return 10;
    } else if (numMarkers === 3) {
      return 9.5;
    } else {
      return mapZoom;
    }
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

    const setClusterer = new MarkerClusterer({ map, renderer });

    setClusterer.addListener('click', function (cluster: Cluster) {
      const mapZoom = map.getZoom() ?? 0;
      const minZoom = cluster.markers?.length
        ? getMinZoom(cluster.markers?.length, mapZoom)
        : 0;

      if (mapZoom && mapZoom < minZoom) {
        const idleListener = map.addListener('idle', function () {
          map.setZoom(minZoom);
          idleListener.remove();
        });
      }
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
