import { useEffect, useState } from 'react';
import Filter from '@/components/Filter';
import {
  FilterChangeHandlers,
  Filters,
  FilterType,
  ProjectSizeType,
} from '@/types/schema';
import { FilterContainerStyles } from './styles';

interface FilterBarProps {
  filters: FilterType[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  tempFilters: Filters;
  setTempFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
  projectSizes: number[];
}

export const FilterBar = ({
  filters,
  setSelectedFilters,
  tempFilters,
  setTempFilters,
  clearFilters,
  projectSizes,
  setActiveLocationCategory,
}: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const handleButtonClick = (filter: FilterType) => {
    setActiveFilter(activeFilter?.id === filter.id ? null : filter);
  };

  const handleProjectSizeChange = ({
    value,
    isTemp,
  }: {
    value: ProjectSizeType;
    isTemp: boolean;
  }) => {
    const setter = isTemp ? setTempFilters : setSelectedFilters;
    setter(prevFilters => ({
      ...prevFilters,
      projectSize: value,
    }));
  };

  const handleTechnologyChange = ({
    value,
    isTemp,
  }: {
    value: string[];
    isTemp: boolean;
  }) => {
    const setter = isTemp ? setTempFilters : setSelectedFilters;
    setter(prevFilters => ({
      ...prevFilters,
      technology: value,
    }));
  };

  const handleStatusChange = ({
    value,
    isTemp,
  }: {
    value: string[];
    isTemp: boolean;
  }) => {
    const setter = isTemp ? setTempFilters : setSelectedFilters;
    setter(prevFilters => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleLocationChange = ({
    value,
    isTemp,
  }: {
    value: string[];
    isTemp: boolean;
  }) => {
    const setter = isTemp ? setTempFilters : setSelectedFilters;
    setter(prevFilters => ({
      ...prevFilters,
      location: value,
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
    // updates the min and max bounds and default slider positions when the histogram changes (i.e when dropdown filters except project size are applied)
    if (lastAppliedFilter !== 'projectSize') {
      const maxValue = Math.max(...projectSizes);
      const minValue = Math.min(...projectSizes);
      const range = maxValue - minValue;
      const padding = range * 0.25;
      setMinBound(minValue - padding);
      setMaxBound(maxValue + padding);

      // if old slider positions are outside of the new range, update slider positions
      setMinDefault(Math.min(maxValue + padding - 1, minDefault));
      setMaxDefault(Math.min(maxValue + padding, maxDefault));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAppliedFilter, projectSizes]);

  return (
    <FilterContainerStyles>
      {filters.map(filter => (
        <Filter
          key={filter.label}
          filter={filter}
          isActive={activeFilter?.id === filter.id}
          tempFilters={tempFilters}
          filterChangeHandlers={filterChangeHandlers}
          handleButtonClick={handleButtonClick}
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
