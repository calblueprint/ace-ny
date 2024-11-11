import React, { useEffect, useState } from 'react';
import TechnologyDropdown from '@/components/TechnologyDropdown';
import { Filter, Filters } from '@/types/schema';
import Drop from '../../assets/DropdownIcons/Drop.svg';
import SVGIcon from '../SVGIcon';
import {
  FilterBackgroundStyles,
  FilterButtonStyles,
  FilterContainerStyles,
  IconStyle,
} from './styles';

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
}) => {
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    statusCompleted: false,
    technology: [],
    projectSize: { min: 0, max: 0 },
    location: [],
  });

  const handleButtonClick = (filter: Filter) => {
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
        <FilterBackgroundStyles
          key={filter.label}
          isActive={activeFilter?.id === filter.id}
        >
          {/* Create rest of filter dropdowns in here */}
          {activeFilter?.id === filter.id ? (
            filter.id === 'technology' ? (
              <TechnologyDropdown
                selectedTechnologies={selectedFilters.technology}
                setSelectedTechnologies={handleTechnologyChange}
                handleButtonClick={handleButtonClick}
                icon={filter.icon}
                label={filter.label}
                currFilter={filter}
              />
            ) : null
          ) : (
            <FilterButtonStyles onClick={() => handleButtonClick(filter)}>
              <IconStyle>{filter.icon}</IconStyle>
              {filter.label}
              <SVGIcon src={Drop} alt="Dropdown" />
            </FilterButtonStyles>
          )}
        </FilterBackgroundStyles>
      ))}
    </FilterContainerStyles>
  );
};
