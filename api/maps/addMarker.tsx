import { Marker } from '@react-google-maps/api';
import { Project } from '../../types/helper';

export default function addMarker(projects: Project[] | null) {
  return projects?.map((project, index) => {
    console.log('index: ', index);
    console.log('project: ', project);
    console.log('approved: ', project.approved);
    console.log('lat: ', project.latitude);
    console.log('lng: ', project.longitude);
    return project.approved ? (
      <Marker
        key={index}
        position={{
          lat: project.longitude,
          lng: project.latitude,
        }}
      />
    ) : null;
  });
}
