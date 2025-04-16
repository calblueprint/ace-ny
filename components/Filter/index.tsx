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
  tempFilters: Filters;
  filterChangeHandlers: FilterChangeHandlers;
  handleButtonClick: (filter: FilterType) => void;
  clearFilters: (filterName?: keyof Filters) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  projectSizes: number[];
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
  minBound: number;
  maxBound: number;
  minDefault: number;
  setMinDefault: React.Dispatch<React.SetStateAction<number>>;
  maxDefault: number;
  setMaxDefault: React.Dispatch<React.SetStateAction<number>>;
}

export default function Filter({
  filter,
  isActive,
  tempFilters,
  filterChangeHandlers,
  handleButtonClick,
  clearFilters,
  setActiveFilter,
  projectSizes,
  setActiveLocationCategory,
  setLastAppliedFilter,
  minBound,
  maxBound,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
}: FilterProps) {
  const [statusFiltersApplied, setStatusFiltersApplied] = useState(false);
  const [technologyFiltersApplied, setTechnologyFiltersApplied] =
    useState(false);

  return (
    <FilterBackgroundStyles $isActive={isActive}>
      {isActive ? (
        filter.id === 'technology' ? (
          <TechnologyDropdown
            tempFilters={tempFilters}
            selectedTechnologies={tempFilters.technology}
            setSelectedTechnologies={filterChangeHandlers.technology}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            setTechnologyFiltersApplied={setTechnologyFiltersApplied}
            technologyFiltersApplied={technologyFiltersApplied}
            setLastAppliedFilter={setLastAppliedFilter}
          />
        ) : filter.id === 'status' ? (
          <StatusDropdown
            tempFilters={tempFilters}
            selectedStatus={tempFilters.status}
            setSelectedStatus={filterChangeHandlers.status}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            setStatusFiltersApplied={setStatusFiltersApplied}
            statusFiltersApplied={statusFiltersApplied}
            setLastAppliedFilter={setLastAppliedFilter}
          />
        ) : filter.id === 'projectSize' ? (
          <ProjectSizeDropdown
            tempFilters={tempFilters}
            setSelectedSize={filterChangeHandlers.projectSize}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            setActiveFilter={setActiveFilter}
            projectSizes={projectSizes}
            minDefault={minDefault}
            setMinDefault={setMinDefault}
            maxDefault={maxDefault}
            setMaxDefault={setMaxDefault}
            setLastAppliedFilter={setLastAppliedFilter}
            minBound={minBound}
            maxBound={maxBound}
          ></ProjectSizeDropdown>
        ) : filter.id === 'location' ? (
          <LocationDropdown
            tempFilters={tempFilters}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            selectedLocationFilters={tempFilters.location}
            setSelectedLocationFilters={filterChangeHandlers.location}
            setActiveLocationCategory={setActiveLocationCategory}
            setLastAppliedFilter={setLastAppliedFilter}
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
