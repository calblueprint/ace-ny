'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { CloseIcon, OpenIcon } from '@/assets/KDM-Icons/icons';
import { GlobeIcon } from '@/assets/Project-Icons/icons';
import { SubHeading2 } from '@/styles/texts';
import { Project } from '../../types/schema';
import ProjectItem from '../ProjectItem';
import { SearchBar } from '../SearchBar';
import {
  AllProjectsHeader,
  DropdownItem,
  DropdownMenu,
  Headers,
  ModalContents,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectItemsDiv,
  SortByButton,
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const projectItems = projects?.map((project: Project) => {
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
          <Headers>
            <AllProjectsHeader>
              <GlobeIcon width={'0.5625rem'} height={'0.5625rem'} />
              <SubHeading2>ALL PROJECTS</SubHeading2>
            </AllProjectsHeader>
            <div style={{ position: 'relative' }}>
              <SortByButton onClick={toggleDropdown}>
                <SubHeading2>SORT BY</SubHeading2>
                {isDropdownOpen ? (
                  <CloseIcon />
                ) : (
                  <OpenIcon width={'10'} height={'14'} />
                )}
              </SortByButton>
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => {}}>Name A-Z</DropdownItem>
                  <DropdownItem onClick={() => {}}>Name Z-A</DropdownItem>
                  <DropdownItem onClick={() => {}}>Size Ascending</DropdownItem>
                  <DropdownItem onClick={() => {}}>
                    Size Descending
                  </DropdownItem>
                  <DropdownItem onClick={() => {}}>COD Ascending</DropdownItem>
                  <DropdownItem onClick={() => {}}>COD Descending</DropdownItem>
                </DropdownMenu>
              )}
            </div>
          </Headers>
          <ProjectItemsDiv>{projectItems}</ProjectItemsDiv>
        </ModalContents>
      </ProjectDetails>
    </Modal>
  );
}
