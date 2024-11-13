'use client';

import Modal from 'react-modal';
import { SubHeading2 } from '@/styles/texts';
import { Project } from '../../types/schema';
import ProjectItem from '../ProjectItem';
import {
  AllProjectsHeader,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
} from './styles';

export default function ProjectsListingModal({
  projects,
}: {
  projects: Project[] | null;
}) {
  const projectItems = projects?.map((project: Project) => {
    return <ProjectItem key={project.id} project_id={project.id} />;
  });

  return (
    <Modal
      isOpen={true}
      style={{
        overlay: modalOverlayStyles,
        content: modalContentStyles,
      }}
    >
      <ProjectDetails>
        <AllProjectsHeader>
          <SubHeading2>ALL PROJECTS</SubHeading2>
        </AllProjectsHeader>
        {projectItems}
      </ProjectDetails>
    </Modal>
  );
}
