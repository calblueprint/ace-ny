'use client';

import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GlobeIcon } from '@/assets/Project-Icons/icons';
import { SubHeading2 } from '@/styles/texts';
import { Project } from '../../types/schema';
import ProjectItem from '../ProjectItem';
import { SearchBar } from '../SearchBar';
import {
  AllProjectsHeader,
  ModalContents,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectItemsDiv,
} from './styles';

export default function ProjectsListingModal({
  projects,
  map,
  setSelectedProjectId,
  searchTerm,
  setSearchTerm,
}: {
  projects: Project[] | null;
  map: google.maps.Map | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, set_value] = useState(false);
  console.log('projects', projects);
  console.log('help me');

  const meep = projects?.map((project: Project) => {
    return (
      <ProjectItem
        key={project.id}
        project_id={project.id}
        setSelectedProjectId={setSelectedProjectId}
        map={map}
        project={project}
      />
    );
  });

  return (
    <Modal
      isOpen={true}
      style={{
        overlay: modalOverlayStyles,
        content: modalContentStyles,
      }}
      ariaHideApp={false}
    >
      <ProjectDetails>
        <ModalContents>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          ></SearchBar>
          <AllProjectsHeader>
            <GlobeIcon width={'0.5625rem'} height={'0.5625rem'} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '400px',
              }}
            >
              <SubHeading2>ALL PROJECTS</SubHeading2>
              {value && (
                <div
                  style={{
                    color: 'rgba(46, 58, 89, 0.75)',
                    fontFamily: '"Coinbase Mono"',
                    fontSize: '10px',
                    margin: "-100px",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '120%',
                  }}
                >
                  Sort By
                </div>
              )}
            </div>
          </AllProjectsHeader>
          <ProjectItemsDiv>{meep}</ProjectItemsDiv>
        </ModalContents>
      </ProjectDetails>
    </Modal>
  );
}
