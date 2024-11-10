import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Filter } from '@/types/schema';
import {
  CheckboxStyles,
  FilterBackgroundStyles,
  FilterButtonStyles,
  FilterContainerStyles,
  FilterDropdownStyles,
} from './styles';

export const FilterBar = ({
  filters,
  onFilterChange,
}: {
  filters: Filter[];
  onFilterChange: (filter: Filter) => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter | null>(null);

  const handleButtonClick = (filter: Filter) => {
    console.log(activeFilter);
    setActiveFilter(activeFilter?.id === filter.id ? null : filter);
    console.log(activeFilter);
    onFilterChange(filter);
  };

  return (
    <FilterContainerStyles>
      {filters.map(filter => (
        <FilterBackgroundStyles key={filter.id}>
          <FilterButtonStyles
            key={filter.label}
            onClick={() => handleButtonClick(filter)}
          >
            {filter.icon}
            {filter.label}
            <RiArrowDropDownLine />
          </FilterButtonStyles>
          {activeFilter?.id === filter.id && (
            <FilterDropdownStyles>
              {filter.categories.map(category => (
                <div key={category.category}>
                  <h3>{category.category}</h3>
                  {category.options.map(option => (
                    <label key={option.option}>
                      <CheckboxStyles>
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.option)}
                          onChange={() => {
                            setSelectedOptions(
                              selectedOptions.includes(option.option)
                                ? selectedOptions.filter(
                                    o => o !== option.option,
                                  )
                                : [...selectedOptions, option.option],
                            );
                          }}
                        />
                        {option.icon}
                        {option.option}
                      </CheckboxStyles>
                    </label>
                  ))}
                </div>
              ))}
            </FilterDropdownStyles>
          )}
        </FilterBackgroundStyles>
      ))}
    </FilterContainerStyles>
  );
};
