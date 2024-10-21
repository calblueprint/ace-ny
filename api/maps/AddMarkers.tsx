import { useState } from 'react';
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

  const handleMarkerClick = (projectId: number) => {
    setSelectedProjectId(prevId => (prevId === projectId ? null : projectId)); // close modal if same, open if different
  };

  const closeModal = () => {
    setSelectedProjectId(null); // close modal
  };

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
            projectId={project.id}
            onMarkerClick={handleMarkerClick}
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
