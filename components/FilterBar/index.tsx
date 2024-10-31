import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Filter from '../../types/helper';
import { FilterBarStyles, FilterButtonStyles } from './styles';

interface Filter {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
}) => {
  return (
    <FilterBarStyles>
      {filters.map(filter => (
        <div key={filter.id}>
          <FilterButtonStyles
            key={filter.label}
            onClick={() => onFilterChange(filter)}
          >
            {filter.icon}
            {filter.label}
            <RiArrowDropDownLine />
          </FilterButtonStyles>
        </div>
      ))}
    </FilterBarStyles>
  );
};
