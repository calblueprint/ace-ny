import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Filter } from '@/types/schema';
import {
  FilterBackgroundStyles,
  FilterButtonStyles,
  FilterContainerStyles,
} from './styles';

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
}) => {
  return (
    <FilterContainerStyles>
      {filters.map(filter => (
        <FilterBackgroundStyles key={filter.id}>
          <FilterButtonStyles
            key={filter.label}
            onClick={() => onFilterChange(filter)}
          >
            {filter.icon}
            {filter.label}
            <RiArrowDropDownLine />
          </FilterButtonStyles>
        </FilterBackgroundStyles>
      ))}
    </FilterContainerStyles>
  );
};
