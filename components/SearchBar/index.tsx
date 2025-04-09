'use client';

import React from 'react';
import { SearchExit, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import COLORS from '../../styles/colors';
import {
  SearchBarBackgroundStyles,
  SearchBarStyles,
  SearchBarWrapperDiv,
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
    <SearchBarBackgroundStyles>
      <SearchBarWrapperDiv>
        {searchTerm && searchTerm.length > 0 ? (
          <SearchExitButton
            onClick={handleExit}
            $isZero={searchTerm?.length === 0}
          >
            <SearchExit />
          </SearchExitButton>
        ) : (
          <SearchIcon fill={COLORS.navy85} />
        )}
        <SearchBarStyles
          type="text"
          placeholder="Search for a project"
          onChange={handleSearchChange}
          value={searchTerm + ''}
        />
      </SearchBarWrapperDiv>
    </SearchBarBackgroundStyles>
  );
};
