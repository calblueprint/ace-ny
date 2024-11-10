import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Filter } from '@/types/schema';
import {
  ApplyButtonStyles,
  CategoryTitleStyles,
  CheckboxContainer,
  CheckboxStyles,
  FilterBackgroundStyles,
  FilterButtonStyles,
  FilterContainerStyles,
  FilterDropdownStyles,
  OptionTitleStyles,
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
                  <CategoryTitleStyles>{category.category}</CategoryTitleStyles>
                  {category.options.map(option => (
                    <CheckboxContainer key={option.title}>
                      {option.icon}
                      <OptionTitleStyles>{option.title}</OptionTitleStyles>
                      <CheckboxStyles
                        type="checkbox"
                        checked={selectedOptions.includes(option.title)}
                        onChange={() => {
                          setSelectedOptions(
                            selectedOptions.includes(option.title)
                              ? selectedOptions.filter(o => o !== option.title)
                              : [...selectedOptions, option.title],
                          );
                        }}
                      />
                    </CheckboxContainer>
                  ))}
                </div>
              ))}
              <ApplyButtonStyles>APPLY</ApplyButtonStyles>
            </FilterDropdownStyles>
          )}
        </FilterBackgroundStyles>
      ))}
    </FilterContainerStyles>
  );
};
