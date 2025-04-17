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
  handleFilterButtonClick,
  currFilter,
  selectedLocationFilters,
  clearFilters,
  setSelectedLocationFilters,
  setActiveFilter,
  categoryOptionsMap,
}: {
  onBack: () => void;
  category: string;
  handleButtonClick: (filter: FilterType) => void;
  handleFilterButtonClick: () => void;
  currFilter: FilterType;
  selectedLocationFilters: string[];
  clearFilters: (filterName?: keyof Filters) => void;
  setSelectedLocationFilters: (value: string[]) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  categoryOptionsMap: Record<string, string[]>;
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

  const handleApplyButtonClick = () => {
    handleFilterButtonClick();
    setActiveFilter(null);
  };

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
              onClick={() => {
                setSelectedLocationFilters([item]);
                setSelectedItem(item);
              }}
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
          onClick={() => {
            clearFilters('location');
            setSelectedLocationFilters(['']);
            setSelectedItem(null);
          }}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </ApplyClearButtonContainer>
    </PanelContainer>
  );
}
