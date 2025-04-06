'use client';

import React from 'react';
import { SearchExit, SearchIcon } from '@/assets/SearchBar-Icons/icons';
import {
  SearchBarBackgroundStyles,
  SearchBarDiv,
  SearchBarPaddingStyles,
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
    <SearchBarPaddingStyles>
      <SearchBarBackgroundStyles>
        <SearchBarDiv>
          <SearchBarWrapperDiv>
            {searchTerm && searchTerm.length > 0 ? (
              <SearchExitButton
                onClick={handleExit}
                $isZero={searchTerm?.length === 0}
              >
                <SearchExit />
              </SearchExitButton>
            ) : (
              <SearchIcon fill={'#4C5671'} />
            )}
            <SearchBarStyles
              type="text"
              placeholder="Search for a project"
              onChange={handleSearchChange}
              value={searchTerm + ''}
            />
          </SearchBarWrapperDiv>
        </SearchBarDiv>
      </SearchBarBackgroundStyles>
    </SearchBarPaddingStyles>
  );
};
