'use client';

import React, { useEffect, useState } from 'react';
import { SearchExit, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import { Project } from '@/types/schema';
import {
  SearchBarBackgroundStyles,
  SearchBarDiv,
  SearchBarPaddingStyles,
  SearchBarStyles,
  SearchExitButton,
} from './styles';

export const SearchBar = ({
  allProjects,
  setFilteredProjects,
}: {
  allProjects: Project[] | null;
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredProjects =
      allProjects?.filter(project =>
        project.project_name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ?? null;
    setFilteredProjects(filteredProjects);
  }, [allProjects, searchTerm, setFilteredProjects]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleExit = () => {
    setSearchTerm('');
  };

  return (
    <SearchBarPaddingStyles>
      <SearchBarBackgroundStyles>
        <SearchBarDiv>
          <SearchIcon />
          <SearchBarStyles
            type="text"
            placeholder="Search for a project"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <SearchExitButton
            onClick={handleExit}
            $isZero={searchTerm.length === 0}
          >
            <SearchExit />
          </SearchExitButton>
        </SearchBarDiv>
      </SearchBarBackgroundStyles>
    </SearchBarPaddingStyles>
  );
};
