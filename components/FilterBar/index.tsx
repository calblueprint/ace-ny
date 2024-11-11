import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import TechnologyDropdown from '@/components/TechnologyDropdown.tsx';
import { Filter, Filters } from '@/types/schema';
import {
  FilterBackgroundStyles,
  FilterButtonStyles,
  FilterContainerStyles,
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
    statusCompleted: false, // Single-select ("in progress", "completed")
    technology: [], // Multi-select
    projectSize: { min: 0, max: 0 }, // Numeric range
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
    console.log('HIII');
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      technology: options,
    }));
  };

  // create a new component just for the technology dropdown
  // once the button is clicked it disappears, and the dropdown appears + replaces where the button was at
  // once the dropdown is closed, the button reappears
  // slap the dropdown on top of the button, and (make the button invisible? not really needed tho)

  //filterbackgroundstyles, filterbuttonstyles should disappear when the dropdown is open
  // use filters.map to render the filter buttons, but not for the dropdown

  // if activeFilter===filter, render the specific dropdown on top of the button
  console.log('Filters', filters);
  return (
    <FilterContainerStyles>
      {filters.map(filter =>
        activeFilter?.id === filter.id ? null : (
          <FilterBackgroundStyles key={filter.label}>
            <FilterButtonStyles
              key={filter.label}
              onClick={() => handleButtonClick(filter)}
            >
              {filter.icon}
              {filter.label}
              <RiArrowDropDownLine />
            </FilterButtonStyles>
          </FilterBackgroundStyles>
        ),
      )}
      {activeFilter?.id === 'technology' && (
        <div>
          <TechnologyDropdown
            selectedTechnologies={selectedFilters.technology}
            setSelectedTechnologies={handleTechnologyChange}
          />
        </div>
      )}
      {/* Add more filter components here */}
    </FilterContainerStyles>
  );
};
