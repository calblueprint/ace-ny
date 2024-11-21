'use client';

import React from 'react';
import { SearchExit, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import {
  SearchBarBackgroundStyles,
  SearchBarDiv,
  SearchBarPaddingStyles,
  SearchBarStyles,
  SearchExitButton,
} from './styles';

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
            value={searchTerm + ''}
          />
          <SearchExitButton
            onClick={handleExit}
            $isZero={searchTerm?.length === 0}
          >
            <SearchExit />
          </SearchExitButton>
        </SearchBarDiv>
      </SearchBarBackgroundStyles>
    </SearchBarPaddingStyles>
  );
};
