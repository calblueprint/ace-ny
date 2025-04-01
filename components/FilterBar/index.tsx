import { useState } from 'react';
import Filter from '@/components/Filter';
import {
  FilterChangeHandlers,
  Filters,
  FilterType,
  projectSizeType,
} from '@/types/schema';
import { FilterContainerStyles } from './styles';

interface FilterBarProps {
  filters: FilterType[];
  selectedFilters: Filters;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleFilterButtonClick: () => void;
  clearFilters: () => void;
  projectSizes: number[];
}

export const FilterBar = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  handleFilterButtonClick,
  clearFilters,
  projectSizes,
}: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const handleButtonClick = (filter: FilterType) => {
    setActiveFilter(activeFilter?.id === filter.id ? null : filter);
  };

  const handleProjectSizeChange = (projectSize: projectSizeType) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      projectSize: projectSize,
    }));
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
  const handleLocationChange = (options: string[]) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      status: options,
    }));
  };

  const filterChangeHandlers: FilterChangeHandlers = {
    // Add other filter change handlers here
    status: handleStatusChange,
    technology: handleTechnologyChange,
    location: handleLocationChange,
    projectSize: handleProjectSizeChange,
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
          handleFilterButtonClick={handleFilterButtonClick}
          clearFilters={clearFilters}
          setActiveFilter={setActiveFilter}
          projectSizes={projectSizes}
        />
      ))}
    </FilterContainerStyles>
  );
};
