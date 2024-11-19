import React, { useState } from 'react';
import Filter from '@/components/Filter';
import {
  FilterChangeHandlers,
  Filters,
  FilterType,
  Project,
} from '@/types/schema';
import { FilterContainerStyles } from './styles';

export const FilterBar = ({
  filters,
  onFilterChange,
  filteredProjects,
  setFilteredProjects,
}: {
  filters: FilterType[];
  onFilterChange: (filter: FilterType) => void;
  filteredProjects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[] | []>>;
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: [],
    technology: [],
    projectSize: { min: 0, max: 0 },
    location: [],
  });

  const handleButtonClick = (filter: FilterType) => {
    setActiveFilter(activeFilter?.id === filter.id ? null : filter);
    onFilterChange(filter);
  };

  const handleTechnologyChange = (options: string[]) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      technology: options,
    }));
  };
  const handleStatusChange = (options: string[]) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      status: options,
    }));
  };

  const filterChangeHandlers: FilterChangeHandlers = {
    // Add other filter change handlers here
    status: handleStatusChange,
    technology: handleTechnologyChange,
    projectSize: () => {},
    location: () => {},
  };

  return (
    <FilterContainerStyles>
      {filters.map(filter => (
        <Filter
          key={filter.label}
          filter={filter}
          isActive={activeFilter?.id === filter.id}
          selectedFilters={selectedFilters}
          filterChangeHandlers={filterChangeHandlers}
          handleButtonClick={handleButtonClick}
          filteredProjects={filteredProjects}
          setFilteredProjects={setFilteredProjects}
        />
      ))}
    </FilterContainerStyles>
  );
};
