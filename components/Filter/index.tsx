import React from 'react';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { Filters, FilterType } from '@/types/schema';
import { DropIcon } from '../../assets/Dropdown-Icons/icons';
import {
  FilterBackgroundStyles,
  FilterButtonStyles,
  IconStyle,
} from './styles';

interface FilterProps {
  filter: FilterType;
  isActive: boolean;
  selectedFilters: Filters;
  onTechnologyChange: (options: string[]) => void;
  handleButtonClick: (filter: FilterType) => void;
}

export default function Filter({
  filter,
  isActive,
  selectedFilters,
  onTechnologyChange,
  handleButtonClick,
}: FilterProps) {
  return (
    <FilterBackgroundStyles isActive={isActive}>
      {isActive ? (
        filter.id === 'technology' ? (
          <TechnologyDropdown
            selectedTechnologies={selectedFilters.technology}
            setSelectedTechnologies={onTechnologyChange}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
          />
        ) : // Add other filter dropdown components here
        null
      ) : (
        <FilterButtonStyles onClick={() => handleButtonClick(filter)}>
          <IconStyle>{filter.icon}</IconStyle>
          {filter.label}
          <DropIcon />
        </FilterButtonStyles>
      )}
    </FilterBackgroundStyles>
  );
}
