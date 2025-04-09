import ProjectSizeDropdown from '@/components/ProjectSizeDropdown';
import StatusDropdown from '@/components/StatusDropdown';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { FilterHeadingUnused } from '@/styles/texts';
import { FilterChangeHandlers, Filters, FilterType } from '@/types/schema';
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
  tempFilters: Filters;
  filterChangeHandlers: FilterChangeHandlers;
  handleButtonClick: (filter: FilterType) => void;
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
  setLastAppliedFilter,
  minBound,
  maxBound,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
}: FilterProps) {
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
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
            setLastAppliedFilter={setLastAppliedFilter}
          />
        ) : filter.id === 'status' ? (
          <StatusDropdown
            tempFilters={tempFilters}
            selectedStatus={tempFilters.status}
            setSelectedStatus={filterChangeHandlers.status}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            label={filter.label}
            currFilter={filter}
            clearFilters={clearFilters}
            setActiveFilter={setActiveFilter}
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
