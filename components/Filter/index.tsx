import ProjectSizeDropdown from '@/components/ProjectSizeDropdown';
import StatusDropdown from '@/components/StatusDropdown';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { FilterHeadingUnused } from '@/styles/texts';
import {
  FilterChangeHandlers,
  Filters,
  FiltersApplied,
  FilterType,
} from '@/types/schema';
import { DropIcon } from '../../assets/Dropdown-Icons/icons';
import LocationDropdown from '../LocationDropdown';
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
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
  minBound: number;
  maxBound: number;
  minDefault: number;
  setMinDefault: React.Dispatch<React.SetStateAction<number>>;
  maxDefault: number;
  setMaxDefault: React.Dispatch<React.SetStateAction<number>>;
  setFiltersApplied: React.Dispatch<React.SetStateAction<FiltersApplied>>;
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
  setLastAppliedFilter,
  minBound,
  maxBound,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
  setFiltersApplied,
}: FilterProps) {
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
            setLastAppliedFilter={setLastAppliedFilter}
            setFiltersApplied={setFiltersApplied}
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
            setLastAppliedFilter={setLastAppliedFilter}
            setFiltersApplied={setFiltersApplied}
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
            minDefault={minDefault}
            setMinDefault={setMinDefault}
            maxDefault={maxDefault}
            setMaxDefault={setMaxDefault}
            setLastAppliedFilter={setLastAppliedFilter}
            minBound={minBound}
            maxBound={maxBound}
            setFiltersApplied={setFiltersApplied}
          ></ProjectSizeDropdown>
        ) : filter.id === 'location' ? (
          <LocationDropdown
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
          ></LocationDropdown>
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
