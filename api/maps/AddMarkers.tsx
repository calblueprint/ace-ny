import { useEffect, useState } from 'react';
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

  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null);

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

  function euclideanDistance(point1: number[], point2: number[]): number {
    const [x1, y1] = point1;
    const [x2, y2] = point2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  const getMinZoom = function (cluster: Cluster, mapZoom: number): number {
    const numMarkers = cluster.markers?.length ?? 0;
    const markers = cluster.markers ?? [];
    if (numMarkers === 2) {
      const marker1Position = (
        markers[0] as google.maps.marker.AdvancedMarkerElement
      ).position ?? { lat: 0, lng: 0 };
      const marker2Position = (
        markers[1] as google.maps.marker.AdvancedMarkerElement
      ).position ?? { lat: 0, lng: 0 };
      const distance = euclideanDistance(
        Object.values(marker1Position),
        Object.values(marker2Position),
      );

      const maxZoom = 11.5;
      const minZoom = 6;
      const maxDistance = 15;

      let zoom = Math.max(
        minZoom,
        Math.min(
          maxZoom,
          minZoom +
            ((maxDistance - distance) / maxDistance) * (maxZoom - minZoom),
        ),
      );

      const projection = map?.getProjection();
      const point1 = projection?.fromLatLngToPoint(marker1Position);
      const point2 = projection?.fromLatLngToPoint(marker2Position);

      const point1x = point1?.x ?? 0;
      const point1y = point1?.y ?? 0;
      const point2x = point2?.x ?? 0;
      const point2y = point2?.y ?? 0;

      const pixelDistance = Math.sqrt(
        Math.pow(point2x - point1x, 2) + Math.pow(point2y - point1y, 2),
      );

      if (pixelDistance > 0.3) {
        zoom = zoom - 1; // slight zoom out for large screen distances
      }
      if (pixelDistance < 0.15) {
        zoom = zoom + 1; // slight zoom in for small screen distances
      }
      return zoom;
    }
    return mapZoom;
  };

  useEffect(() => {
    if (!map || !projects) return;

    // clear previous cluster markers
    if (clusterer) {
      clusterer.clearMarkers();
    }

    const renderer = {
      render(cluster: Cluster) {
        const count = cluster.markers?.length ?? 0;
        const position = cluster.position;

        const container = document.createElement('div');
        const root = ReactDOM.createRoot(container);
        root.render(<ClusterIcon count={count} />);

        return new google.maps.marker.AdvancedMarkerElement({
          position: position,
          content: container,
        });
      },
    };

    const newClusterer = new MarkerClusterer({ map, renderer });

    // Set zoom behavior for clusters
    newClusterer.addListener('click', (cluster: Cluster) => {
      const mapZoom = map.getZoom() ?? 0;
      const minZoom = getMinZoom(cluster, mapZoom);
      if (mapZoom && mapZoom < minZoom) {
        const idleListener = map.addListener('idle', () => {
          map.setZoom(minZoom);
          idleListener.remove();
        });
      }
    });

    setClusterer(newClusterer);

    // Cleanup on unmount or dependencies change
    return () => {
      newClusterer.clearMarkers();
      setClusterer(null);
    };
  }, [map, projects]);

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
