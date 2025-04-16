import { useEffect, useState } from 'react';
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
  clearFilters: (filterName?: keyof Filters) => void;
  projectSizes: number[];
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export const FilterBar = ({
  filters,
  selectedFilters,
  setSelectedFilters,
  handleFilterButtonClick,
  clearFilters,
  projectSizes,
  setActiveLocationCategory,
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
      location: options,
    }));
  };

  const filterChangeHandlers: FilterChangeHandlers = {
    // Add other filter change handlers here
    status: handleStatusChange,
    technology: handleTechnologyChange,
    location: handleLocationChange,
    projectSize: handleProjectSizeChange,
  };

  const [lastAppliedFilter, setLastAppliedFilter] = useState('');
  const maxSize = Math.max(...projectSizes);
  const [minBound, setMinBound] = useState(-100);
  const [maxBound, setMaxBound] = useState(maxSize + 100);
  const [minDefault, setMinDefault] = useState(-100);
  const [maxDefault, setMaxDefault] = useState(maxSize + 100);

  useEffect(() => {
    // updates the min and max bounds and default slider positions when the histogram changes aka when dropdown filters except project size are applied
    if (lastAppliedFilter !== 'projectSize') {
      const maxValue = Math.max(...projectSizes);
      const minValue = Math.min(...projectSizes);
      const range = maxValue - minValue;
      const padding = range * 0.25;
      setMinBound(minValue - padding);
      setMaxBound(maxValue + padding);
      setMinDefault(minValue - padding);
      setMaxDefault(maxValue + padding);
    }
  }, [lastAppliedFilter, projectSizes]);

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
          setActiveLocationCategory={setActiveLocationCategory}
          setLastAppliedFilter={setLastAppliedFilter}
          minBound={minBound}
          maxBound={maxBound}
          minDefault={minDefault}
          maxDefault={maxDefault}
          setMinDefault={setMinDefault}
          setMaxDefault={setMaxDefault}
        />
      ))}
    </FilterContainerStyles>
  );
};
