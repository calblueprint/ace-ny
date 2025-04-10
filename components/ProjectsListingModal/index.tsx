'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import { CloseIcon, OpenIcon } from '@/assets/KDM-Icons/icons';
import { CloseModalIcon, GlobeIcon } from '@/assets/Project-Icons/icons';
import { SearchIcon } from '@/assets/SearchBar-Icons/icons';
import { FilterNameText, SubHeading2 } from '@/styles/texts';
import { Project } from '../../types/schema';
import ProjectItem from '../ProjectItem';
import { SearchBar } from '../SearchBar';
import SortBy from '../SortBy/index';
import {
  AllProjectsHeader,
  CloseModalButton,
  Headers,
  ModalContents,
  modalContentStyles,
  modalOverlayStyles,
  ProjectDetails,
  ProjectItemsDiv,
  SearchButton,
  SearchButtonBackground,
  SearchIconStyles,
  SortByButton,
  SortByDiv,
  SortByMenu,
} from './styles';

export default function ProjectsListingModal({
  projects,
  map,
  setSelectedProjectId,
  searchTerm,
  setSearchTerm,
  selectedProjectId,
}: {
  projects: Project[] | null;
  map: google.maps.Map | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedProjectId: number | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [sortedProjects, setSortedProjects] = useState<Project[] | null>(
    projects,
  );

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const toggleSortBy = () => setIsSortByOpen(prev => !prev);

  const projectItems = sortedProjects?.map((project: Project) => {
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
    <>
      {!isModalOpen ? (
        <SearchButtonBackground>
          <SearchButton onClick={openModal}>
            <SearchIconStyles>
              <SearchIcon fill={'#4C5671'} />
            </SearchIconStyles>
            <FilterNameText>SEARCH</FilterNameText>
          </SearchButton>
        </SearchButtonBackground>
      ) : (
        <>
          {!selectedProjectId && (
            <CloseModalButton onClick={closeModal}>
              <CloseModalIcon />
            </CloseModalButton>
          )}
          <Modal
            isOpen={isModalOpen}
            style={{ overlay: modalOverlayStyles, content: modalContentStyles }}
            ariaHideApp={false}
          >
            <ProjectDetails>
              <ModalContents>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <Headers>
                  <AllProjectsHeader>
                    <GlobeIcon width={'0.5625rem'} height={'0.5625rem'} />
                    <SubHeading2>ALL PROJECTS</SubHeading2>
                  </AllProjectsHeader>
                  <SortByDiv>
                    <SortByButton onClick={toggleSortBy}>
                      <SubHeading2>SORT BY</SubHeading2>
                      {isSortByOpen ? (
                        <CloseIcon />
                      ) : (
                        <OpenIcon width={'10'} height={'14'} />
                      )}
                    </SortByButton>
                    {isSortByOpen && (
                      <SortByMenu>
                        <SortBy
                          category="Name A-Z"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                        <SortBy
                          category="Name Z-A"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                        <SortBy
                          category="Size Ascending"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                        <SortBy
                          category="Size Descending"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                        <SortBy
                          category="COD Ascending"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                        <SortBy
                          category="COD Descending"
                          projects={projects}
                          setSortedProjects={setSortedProjects}
                          toggleSortBy={toggleSortBy}
                        />
                      </SortByMenu>
                    )}
                  </SortByDiv>
                </Headers>
                <ProjectItemsDiv>{projectItems}</ProjectItemsDiv>
              </ModalContents>
            </ProjectDetails>
          </Modal>
        </>
      )}
    </>
  );
}
