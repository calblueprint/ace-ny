import { Project } from '../../types/schema';
import { MarkerInfoWindow } from './MarkerWithInfoWindow';

export default function addMarker({
  projects,
}: {
  projects: Project[] | null;
}) {
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
          />
        );
      })}
    </>
  );
}
