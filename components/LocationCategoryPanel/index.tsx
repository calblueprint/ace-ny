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
  onBack,
  category,
  handleButtonClick,
  currFilter,
  selectedLocationFilters,
  clearButtonHandler,
  setSelectedLocationFilters,
  categoryOptionsMap,
  activeCategory,
  setAppliedCategory,
  applyButtonHandler,
}: {
  onBack: () => void;
  category: string;
  handleButtonClick: (filter: FilterType) => void;
  currFilter: FilterType;
  selectedLocationFilters: string[];
  clearButtonHandler: (filter: keyof Filters) => void;
  setSelectedLocationFilters: (args: {
    value: string[];
    isTemp: boolean;
  }) => void;
  categoryOptionsMap: Record<string, string[]>;
  activeCategory: string | null;
  setAppliedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  applyButtonHandler: (filter: keyof Filters) => void;
}) {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedLocationFilters[0] ?? null,
  );
  const [searchTerm, setSearchTerm] = useState('');

  const options: string[] | null = categoryOptionsMap[category] ?? null;

  const uniqueOptions = options
    ? Array.from(new Set(options.map(item => item.trim())))
    : [];

  const filteredOptions = uniqueOptions?.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const applyButtonHandlerLocation = () => {
    setAppliedCategory(activeCategory);
    applyButtonHandler('location');
  };

  const clearButtonHandlerLocation = () => {
    clearButtonHandler('location');
    setSelectedItem(null);
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
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchIconWithTextContainer>
          <Underline />
        </SearchBar>
        <ItemContainer>
          {filteredOptions?.map(item => (
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
              applyButtonHandlerLocation();
            }
          }}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
        <ClearButtonStyles
          $isActive={selectedItem !== null}
          onClick={clearButtonHandlerLocation}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </ApplyClearButtonContainer>
    </PanelContainer>
  );
}
