import { useState } from 'react';
import ProjectSizeDropdown from '@/components/ProjectSizeDropdown';
import StatusDropdown from '@/components/StatusDropdown';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { FilterHeadingInUse, FilterHeadingUnused } from '@/styles/texts';
import { FilterChangeHandlers, Filters, FilterType } from '@/types/schema';
import { DropIcon, ExitIconApplied } from '../../assets/Dropdown-Icons/icons';
import LocationDropdown from '../LocationDropdown';
import {
  ExitIconStyle,
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
  clearFilters: (filterName?: keyof Filters) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  projectSizes: number[];
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
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
  setActiveLocationCategory,
}: FilterProps) {
  const maxValue = Math.max(...projectSizes);

  const [minRange, setMinRange] = useState(-100);
  const [maxRange, setMaxRange] = useState(maxValue + 100);
  const [statusFiltersApplied, setStatusFiltersApplied] = useState(false);
  const [technologyFiltersApplied, setTechnologyFiltersApplied] =
    useState(false);
  const [appliedCategory, setAppliedCategory] = useState<string | null>(null);
  return (
    <FilterBackgroundStyles $isActive={isActive}>
      {isActive ? (
        filter.id === 'technology' ? (
          <TechnologyDropdown
            selectedTechnologies={selectedFilters.technology}
            setSelectedTechnologies={filterChangeHandlers.technology}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            setTechnologyFiltersApplied={setTechnologyFiltersApplied}
            technologyFiltersApplied={technologyFiltersApplied}
          />
        ) : filter.id === 'status' ? (
          <StatusDropdown
            selectedStatus={selectedFilters.status}
            setSelectedStatus={filterChangeHandlers.status}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            setStatusFiltersApplied={setStatusFiltersApplied}
            statusFiltersApplied={statusFiltersApplied}
          />
        ) : filter.id === 'projectSize' ? (
          <ProjectSizeDropdown
            setSelectedSize={filterChangeHandlers.projectSize}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            handleFilterButtonClick={handleFilterButtonClick}
            setActiveFilter={setActiveFilter}
            projectSizes={projectSizes}
            minRange={minRange}
            setMinRange={setMinRange}
            maxRange={maxRange}
            setMaxRange={setMaxRange}
          ></ProjectSizeDropdown>
        ) : filter.id === 'location' ? (
          <LocationDropdown
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            handleFilterButtonClick={handleFilterButtonClick}
            setActiveFilter={setActiveFilter}
            selectedLocationFilters={selectedFilters.location}
            setSelectedLocationFilters={filterChangeHandlers.location}
            setActiveLocationCategory={setActiveLocationCategory}
            appliedCategory={appliedCategory}
            setAppliedCategory={setAppliedCategory}
          ></LocationDropdown>
        ) : // Add other filter dropdown components here
        null
      ) : (
        <FilterButtonStyles onClick={() => handleButtonClick(filter)}>
          {(filter.id === 'status' && statusFiltersApplied) ||
          (filter.id === 'technology' && technologyFiltersApplied) ? (
            <>
              <IconStyle>{filter.iconApplied}</IconStyle>
              <FilterHeadingInUse>{filter.label}</FilterHeadingInUse>
              <ExitIconStyle>
                <ExitIconApplied />
              </ExitIconStyle>
            </>
          ) : (
            <>
              <IconStyle>{filter.icon}</IconStyle>
              <FilterHeadingUnused>{filter.label}</FilterHeadingUnused>
              <DropIcon />
            </>
          )}
        </FilterButtonStyles>
      )}
    </FilterBackgroundStyles>
  );
}
