'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { CloseIcon, OpenIcon } from '@/assets/KDM-Icons/icons';
import { CloseModalIcon, GlobeIcon } from '@/assets/Project-Icons/icons';
import { NoProjectsFound, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import COLORS from '@/styles/colors';
import { FilterNameText, SubHeading1, SubHeading2 } from '@/styles/texts';
import { SortByText } from '../../styles/texts';
import { Filters, Project } from '../../types/schema';
import FilterTags from '../FilterTags';
import ProjectItem from '../ProjectItem';
import { SearchBar } from '../SearchBar';
import {
  AllProjectsHeader,
  CloseModalButton,
  Headers,
  ModalContents,
  modalContentStyles,
  modalOverlayStyles,
  NoProjectsDiv,
  NoProjectsFoundText,
  ProjectDetails,
  ProjectItemsDiv,
  SearchButton,
  SearchButtonBackground,
  SearchIconStyles,
  SortBy,
  SortByButton,
  SortByItem,
  SortByMenu,
} from './styles';

export default function ProjectsListingModal({
  projects,
  map,
  setSelectedProjectId,
  searchTerm,
  setSearchTerm,
  selectedProjectId,
  clearFilters,
  selectedFilters,
  defaultProjectSize,
}: {
  projects: Project[] | null;
  map: google.maps.Map | null;
  setSelectedProjectId: React.Dispatch<React.SetStateAction<number | null>>;
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedProjectId: number | null;
  clearFilters: () => void;
  selectedFilters: Filters;
  defaultProjectSize: {
    min: number;
    max: number;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSortByOpen, setIsSortByOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const toggleSortBy = () => setIsSortByOpen(prev => !prev);

  const projectItems = projects?.map((project: Project) => (
    <ProjectItem
      key={project.id}
      project_id={project.id}
      setSelectedProjectId={setSelectedProjectId}
      map={map}
      project={project}
    />
  ));

  const hasActiveFilters = () => {
    return (
      selectedFilters.status.length > 0 ||
      selectedFilters.technology.length > 0 ||
      selectedFilters.location.length > 0 ||
      selectedFilters.projectSize.min > defaultProjectSize.min ||
      selectedFilters.projectSize.max < defaultProjectSize.max
    );
  };

  const hasProjects = projects && projects.length > 0;

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

                {hasProjects && (
                  <Headers>
                    <AllProjectsHeader>
                      <GlobeIcon width={'0.5625rem'} height={'0.5625rem'} />
                      <SubHeading2>ALL PROJECTS</SubHeading2>
                    </AllProjectsHeader>

                    {/* fix the clear */}
                    <SortByButton onClick={() => clearFilters()}>
                      <SubHeading2>CLEAR</SubHeading2>
                    </SortByButton>

                    <SortBy>
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
                          <SortByItem onClick={() => {}}>
                            <SortByText>Name A-Z</SortByText>
                          </SortByItem>
                          <SortByItem onClick={() => {}}>
                            <SortByText>Name Z-A</SortByText>
                          </SortByItem>
                          <SortByItem onClick={() => {}}>
                            <SortByText>Size Ascending</SortByText>
                          </SortByItem>
                          <SortByItem onClick={() => {}}>
                            <SortByText>Size Descending</SortByText>
                          </SortByItem>
                          <SortByItem onClick={() => {}}>
                            <SortByText>COD Ascending</SortByText>
                          </SortByItem>
                          <SortByItem onClick={() => {}}>
                            <SortByText>COD Descending</SortByText>
                          </SortByItem>
                        </SortByMenu>
                      )}
                    </SortBy>
                  </Headers>
                )}

                {hasActiveFilters() && (
                  <FilterTags
                    selectedFilters={selectedFilters}
                    defaultProjectSize={defaultProjectSize}
                  />
                )}
                <ProjectItemsDiv>
                  {hasProjects ? (
                    projectItems
                  ) : (
                    <NoProjectsDiv>
                      <NoProjectsFound />
                      <SubHeading1
                        style={{
                          color: COLORS.navy85,
                        }}
                      >
                        NO PROJECTS FOUND
                      </SubHeading1>
                      <NoProjectsFoundText>
                        Try adjusting your search terms and filters to find what
                        you&#39;re looking for
                      </NoProjectsFoundText>
                    </NoProjectsDiv>
                  )}
                </ProjectItemsDiv>
              </ModalContents>
            </ProjectDetails>
          </Modal>
        </>
      )}
    </>
  );
}
