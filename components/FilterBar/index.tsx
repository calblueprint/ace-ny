import React, { useState } from 'react';
import Filter from '@/components/Filter';
import { FilterChangeHandlers, Filters, FilterType } from '@/types/schema';
import { FilterContainerStyles } from './styles';

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: FilterType[];
  onFilterChange: (filter: FilterType) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    status: false,
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

  const filterChangeHandlers: FilterChangeHandlers = {
    // Add other filter change handlers here
    status: () => {},
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
        />
      ))}
    </FilterContainerStyles>
  );
};
