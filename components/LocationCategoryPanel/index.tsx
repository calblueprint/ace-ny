import React, { useState } from 'react';
import {
  ApplyFiltersText,
  ClearFiltersText,
  PanelTitle,
  SearchInput,
} from '@/styles/texts';
import { Filters, FilterType } from '@/types/schema';
import {
  BackArrowIcon,
  SearchIcon,
  UpArrowIcon,
} from '../../assets/Location-Category-Icons/icons';
import LocationCategoryOption from '../LocationCategoryOption';
import {
  ApplyButtonStyles,
  ApplyClearButtonContainer,
  BackArrowIconButton,
  BackArrowWithTitleContainer,
  CategoryInnerContainer,
  ClearButtonStyles,
  CloseIconButton,
  ItemContainer,
  PanelContainer,
  PanelHeader,
  SearchBar,
  SearchIconWithTextContainer,
  Underline,
} from './styles';

export default function LocationCategoryPanel({
  tempFilters,
  onBack,
  category,
  handleButtonClick,
  currFilter,
  selectedLocationFilters,
  clearFilters,
  setSelectedLocationFilters,
  setActiveFilter,
  categoryOptionsMap,
  setLastAppliedFilter,
}: {
  tempFilters: Filters;
  onBack: () => void;
  category: string;
  handleButtonClick: (filter: FilterType) => void;
  currFilter: FilterType;
  selectedLocationFilters: string[];
  clearFilters: () => void;
  setSelectedLocationFilters: (args: {
    value: string[];
    isTemp: boolean;
  }) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  categoryOptionsMap: Record<string, string[]>;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedLocationFilters[0] ?? null,
  );

  const options = categoryOptionsMap[category];

  const handleApplyButtonClick = () => {
    setSelectedLocationFilters({ value: tempFilters.location, isTemp: false });
    setActiveFilter(null);
    setLastAppliedFilter('location');
  };

  function checkBoxClickHandler(item: string): void {
    setSelectedLocationFilters({ value: [item], isTemp: true });
    setSelectedItem(item);
  }

  return (
    <PanelContainer>
      <CategoryInnerContainer>
        <PanelHeader>
          <BackArrowWithTitleContainer>
            <BackArrowIconButton onClick={onBack}>
              <BackArrowIcon />
            </BackArrowIconButton>
            <PanelTitle>{category}</PanelTitle>
          </BackArrowWithTitleContainer>
          <CloseIconButton onClick={() => handleButtonClick(currFilter)}>
            <UpArrowIcon />
          </CloseIconButton>
        </PanelHeader>
        <SearchBar>
          <SearchIconWithTextContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search"
              // onChange={(e) => {
              //   // handle search input change implement later
              // }}
            />
          </SearchIconWithTextContainer>
          <Underline />
        </SearchBar>
        <ItemContainer>
          {options.map(item => (
            <LocationCategoryOption
              key={item}
              label={item}
              selected={selectedItem === item}
              onClick={() => checkBoxClickHandler(item)}
            />
          ))}
        </ItemContainer>
      </CategoryInnerContainer>

      <ApplyClearButtonContainer>
        <ApplyButtonStyles
          $isActive={selectedItem !== null}
          onClick={() => {
            if (selectedItem) {
              handleApplyButtonClick();
            }
          }}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
        <ClearButtonStyles
          $isActive={selectedItem !== null}
          onClick={clearFilters}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </ApplyClearButtonContainer>
    </PanelContainer>
  );
}
