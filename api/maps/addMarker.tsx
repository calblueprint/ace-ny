import { Marker } from '@react-google-maps/api';
import { Project } from '../../types/schema';

export default function addMarker(projects: Project[] | null) {
  return projects?.map(project => {
    return project.approved ? (
      <Marker
        key={project.id}
        position={{
          lat: project.latitude,
          lng: project.longitude,
        }}
      />
    ) : null;
  });
}
