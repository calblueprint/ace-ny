import { useState } from 'react';
import LocationDropdown from '@/components/LocationDropdown';
import ProjectSizeDropdown from '@/components/ProjectSizeDropdown';
import StatusDropdown from '@/components/StatusDropdown';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { FilterHeadingUnused } from '@/styles/texts';
import { FilterChangeHandlers, Filters, FilterType } from '@/types/schema';
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
  filterChangeHandlers: FilterChangeHandlers;
  handleButtonClick: (filter: FilterType) => void;
  handleFilterButtonClick: () => void;
  clearFilters: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  projectSizes: number[];
}

export default function Filter({
  filter,
  isActive,
  selectedFilters,
  filterChangeHandlers,
  handleButtonClick,
  handleFilterButtonClick,
  clearFilters,
  setActiveFilter,
  projectSizes,
}: FilterProps) {
  const maxValue = Math.max(...projectSizes);

  const [minRange, setMinRange] = useState(-100);
  const [maxRange, setMaxRange] = useState(maxValue + 100);

  return (
    <FilterBackgroundStyles $isActive={isActive}>
      {isActive ? (
        filter.id === 'technology' ? (
          <TechnologyDropdown
            selectedTechnologies={selectedFilters.technology}
            setSelectedTechnologies={filterChangeHandlers.technology}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
          />
        ) : filter.id === 'status' ? (
          <StatusDropdown
            selectedStatus={selectedFilters.status}
            setSelectedStatus={filterChangeHandlers.status}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
          />
        ) : filter.id === 'projectSize' ? (
          <ProjectSizeDropdown
            selectedSize={selectedFilters.projectSize}
            setSelectedSize={filterChangeHandlers.projectSize}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            projectSizes={projectSizes}
            minRange={minRange}
            setMinRange={setMinRange}
            maxRange={maxRange}
            setMaxRange={setMaxRange}
          ></ProjectSizeDropdown>
        ) : filter.id === 'location' ? (
          <div></div>
        ) : // Add other filter dropdown components here
        null
      ) : (
        <FilterButtonStyles onClick={() => handleButtonClick(filter)}>
          <IconStyle>{filter.icon}</IconStyle>
          <FilterHeadingUnused>{filter.label}</FilterHeadingUnused>
          <DropIcon />
        </FilterButtonStyles>
      )}
    </FilterBackgroundStyles>
  );
}
