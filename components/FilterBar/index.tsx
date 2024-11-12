import React, { useEffect, useState } from 'react';
import Filter from '@/components/Filter';
import { Filters, FilterType } from '@/types/schema';
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
    statusCompleted: false,
    technology: [],
    projectSize: { min: 0, max: 0 },
    location: [],
  });

  const handleButtonClick = (filter: FilterType) => {
    setActiveFilter(activeFilter?.id === filter.id ? null : filter);
    onFilterChange(filter);
  };

  useEffect(() => {
    console.log(activeFilter);
  }, [activeFilter]);

  const handleTechnologyChange = (options: string[]) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      technology: options,
    }));
  };
  return (
    <FilterContainerStyles>
      {filters.map(filter => (
        <Filter
          key={filter.label}
          filter={filter}
          isActive={activeFilter?.id === filter.id}
          selectedFilters={selectedFilters}
          onTechnologyChange={handleTechnologyChange}
          handleButtonClick={handleButtonClick}
        />
      ))}
    </FilterContainerStyles>
  );
};
