import { useEffect, useRef, useState } from 'react';
import ProjectSizeDropdown from '@/components/ProjectSizeDropdown';
import StatusDropdown from '@/components/StatusDropdown';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { FilterHeadingInUse, FilterHeadingUnused } from '@/styles/texts';
import { FilterChangeHandlers, Filters, FilterType } from '@/types/schema';
import { ClearIcon, DropIcon } from '../../assets/Dropdown-Icons/icons';
import LocationDropdown from '../LocationDropdown';
import {
  ClearIconStyle,
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
  selectedProjectId: number | null;
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
  selectedProjectId,
}: FilterProps) {
  const [statusFiltersApplied, setStatusFiltersApplied] = useState(false);
  const [technologyFiltersApplied, setTechnologyFiltersApplied] =
    useState(false);

  const [projectSizeFiltersApplied, setProjectSizeFiltersApplied] =
    useState(false);

  const [locationFiltersApplied, setLocationFiltersApplied] = useState(false);

  const [appliedCategory, setAppliedCategory] = useState<string | null>(null);

  const applyButtonHandler = (filter: keyof Filters) => {
    switch (filter) {
      case 'technology':
        filterChangeHandlers.technology({
          value: tempFilters.technology,
          isTemp: false,
        });
        setTechnologyFiltersApplied(true);
        break;
      case 'status':
        filterChangeHandlers.status({
          value: tempFilters.status,
          isTemp: false,
        });
        setStatusFiltersApplied(true);
        break;
      case 'projectSize':
        filterChangeHandlers.projectSize({
          value: tempFilters.projectSize,
          isTemp: false,
        });
        setProjectSizeFiltersApplied(true);
        break;
      case 'location':
        filterChangeHandlers.location({
          value: tempFilters.location,
          isTemp: false,
        });
        setLocationFiltersApplied(true);
        break;
    }

    setActiveFilter(null);
    setLastAppliedFilter(filter);
  };

  const clearButtonHandler = (filter: keyof Filters) => {
    clearFilters(filter);
    setLastAppliedFilter(filter);
    switch (filter) {
      case 'projectSize':
        setMinDefault(minBound);
        setMaxDefault(maxBound);
        setProjectSizeFiltersApplied(false);
        break;
      case 'technology':
        setTechnologyFiltersApplied(false);
        break;
      case 'status':
        setStatusFiltersApplied(false);
        break;
      case 'location':
        setLocationFiltersApplied(false);
        setAppliedCategory(null);
        break;
    }
  };
  const prevSelectedProjectId = useRef<number | null>(null);

  useEffect(() => {
    if (
      prevSelectedProjectId.current !== selectedProjectId &&
      selectedProjectId !== null &&
      isActive &&
      ['technology', 'status', 'projectSize', 'location'].includes(filter.id)
    ) {
      setActiveFilter(null);
    }
    prevSelectedProjectId.current = selectedProjectId;
  }, [selectedProjectId, setActiveFilter, isActive, filter.id]);

  return (
    <FilterBackgroundStyles $isActive={isActive}>
      {isActive ? (
        filter.id === 'technology' ? (
          <TechnologyDropdown
            selectedTechnologies={tempFilters.technology}
            setSelectedTechnologies={filterChangeHandlers.technology}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            clearButtonHandler={clearButtonHandler}
            technologyFiltersApplied={technologyFiltersApplied}
            applyButtonHandler={applyButtonHandler}
          />
        ) : filter.id === 'status' ? (
          <StatusDropdown
            selectedStatus={tempFilters.status}
            setSelectedStatus={filterChangeHandlers.status}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            clearButtonHandler={clearButtonHandler}
            statusFiltersApplied={statusFiltersApplied}
            applyButtonHandler={applyButtonHandler}
          />
        ) : filter.id === 'projectSize' ? (
          <ProjectSizeDropdown
            setSelectedSize={filterChangeHandlers.projectSize}
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            projectSizes={projectSizes}
            minDefault={minDefault}
            setMinDefault={setMinDefault}
            maxDefault={maxDefault}
            setMaxDefault={setMaxDefault}
            minBound={minBound}
            maxBound={maxBound}
            clearButtonHandler={clearButtonHandler}
            projectSizeFiltersApplied={projectSizeFiltersApplied}
            applyButtonHandler={applyButtonHandler}
          ></ProjectSizeDropdown>
        ) : filter.id === 'location' ? (
          <LocationDropdown
            handleButtonClick={handleButtonClick}
            icon={filter.icon}
            iconApplied={filter.iconApplied}
            label={filter.label}
            currFilter={filter}
            clearButtonHandler={clearButtonHandler}
            selectedLocationFilters={tempFilters.location}
            setSelectedLocationFilters={filterChangeHandlers.location}
            setActiveLocationCategory={setActiveLocationCategory}
            appliedCategory={appliedCategory}
            setAppliedCategory={setAppliedCategory}
            applyButtonHandler={applyButtonHandler}
            locationFiltersApplied={locationFiltersApplied}
          ></LocationDropdown>
        ) : // Add other filter dropdown components here
        null
      ) : (
        <FilterButtonStyles onClick={() => handleButtonClick(filter)}>
          {(filter.id === 'status' && statusFiltersApplied) ||
          (filter.id === 'technology' && technologyFiltersApplied) ||
          (filter.id === 'projectSize' && projectSizeFiltersApplied) ||
          (filter.id === 'location' && locationFiltersApplied) ? (
            <>
              <IconStyle>{filter.iconApplied}</IconStyle>
              <FilterHeadingInUse>{filter.label}</FilterHeadingInUse>
              <ClearIconStyle>
                <div
                  onClick={e => {
                    e.stopPropagation();
                    clearButtonHandler(filter.id);
                  }}
                >
                  <ClearIcon width={'10'} height={'10'} />
                </div>
              </ClearIconStyle>
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
