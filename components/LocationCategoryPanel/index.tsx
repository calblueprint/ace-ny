import React, { useState } from 'react';
import {
  ApplyFiltersText,
  ClearFiltersText,
  PanelTitle,
  SearchInput,
} from '@/styles/texts';
import { FilterType } from '@/types/schema';
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

interface LocationCategoryPanelProps {
  onBack: () => void;
  category: string;
  handleButtonClick: (filter: FilterType) => void;
  handleFilterButtonClick: () => void;
  currFilter: FilterType;
  selectedLocationFilters: string[];
  clearFilters: () => void;
  setSelectedLocationFilters: (value: string[]) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
}

export default function LocationCategoryPanel(
  props: LocationCategoryPanelProps,
) {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    props.selectedLocationFilters[0] ?? null,
  );

  const counties = [
    'Albany County',
    'Allegany County',
    'Bronx County',
    'Broome County',
    'Cattaraugus County',
    'Cayuga County',
    'Chautauqua County',
    'Chemung County',
    'Chenango County',
    'Clinton County',
    'Columbia County',
    'Cortland County',
    'Delaware County',
    'Dutchess County',
    'Erie County',
    'Essex County',
    'Franklin County',
    'Fulton County',
    'Genesee County',
    'Greene County',
    'Hamilton County',
    'Herkimer County',
    'Jefferson County',
    'Kings County',
    'Lewis County',
    'Livingston County',
    'Madison County',
    'Monroe County',
    'Montgomery County',
    'Nassau County',
    'New York County',
    'Niagara County',
    'Oneida County',
    'Onondaga County',
    'Ontario County',
    'Orange County',
    'Orleans County',
    'Oswego County',
    'Otsego County',
    'Putnam County',
    'Queens County',
    'Rensselaer County',
    'Richmond County',
    'Rockland County',
    'St. Lawrence County',
    'Saratoga County',
    'Schenectady County',
    'Schoharie County',
    'Schuyler County',
    'Seneca County',
    'Steuben County',
    'Suffolk County',
    'Sullivan County',
    'Tioga County',
    'Tompkins County',
    'Ulster County',
    'Warren County',
    'Washington County',
    'Wayne County',
    'Westchester County',
    'Wyoming County',
    'Yates County',
  ];

  const nyRegions = [
    'Capital Region',
    'Central New York',
    'Finger Lakes',
    'Long Island',
    'Mid-Hudson',
    'Mohawk Valley',
    'New York City',
    'North Country',
    'Southern Tier',
    'Western New York',
  ];

  const utilityServiceTerritories = [
    'National Grid',
    'Rochester Gas and Electric',
    'NYS Electric and Gas',
    'Central Hudson Gas and Electric',
    'Orange and Rockland Utilities',
    'Long Island Power Authority',
    'Consolidated Edison',
    'Municipal Utility: ROUSES POINT',
    'Municipal Utility: MASSENA',
    'Municipal Utility: PLATTSBURGH',
    'Municipal Utility: LAKE PLACID',
    'Municipal Utility: TUPPER LAKE',
    'Municipal Utility: THERESA',
    'Municipal Utility: PHILADELPHIA',
    'Municipal Utility: BOONVILLE',
    'Municipal Utility: HOLLEY',
    'Municipal Utility: SPENCERPORT',
    'Municipal Utility: CHURCHVILLE',
    'Municipal Utility: FAIRPORT',
    'Municipal Utility: BERGEN',
    'Municipal Utility: SHERRILL',
    'Municipal Utility: AKRON',
    'Municipal Utility: SOLVAY',
    'Municipal Utility: FRANKFORT',
    'Municipal Utility: ILION',
    'Municipal Utility: MOHAWK',
    'Municipal Utility: SKANEATELES',
    'Municipal Utility: HAMILTON',
    'Municipal Utility: GREEN ISLAND',
    'Municipal Utility: SILVER SPRINGS',
    'Municipal Utility: PENN YAN',
    'Municipal Utility: SHERBURNE',
    'Municipal Utility: CASTILE',
    'Municipal Utility: RICHMONDVILLE',
    'Municipal Utility: GROTON',
    'Municipal Utility: ARCADE',
    'Municipal Utility: SPRINGVILLE',
    'Municipal Utility: BROCTON',
    'Municipal Utility: MARATHON',
    'Municipal Utility: WESTFIELD',
    'Municipal Utility: WATKINS GLEN',
    'Municipal Utility: BATH',
    'Municipal Utility: MAYVILLE',
    'Municipal Utility: ANGELICA',
    'Municipal Utility: GREENE',
    'Municipal Utility: LITTLE VALLEY',
    'Municipal Utility: SALAMANCA',
    'Municipal Utility: JAMESTOWN',
    'Municipal Utility: ANDOVER',
    'Municipal Utility: WELLSVILLE',
    'Municipal Utility: ENDICOTT',
    'Municipal Utility: WAVERLY',
    'Municipal Utility: FISHERS ISLAND',
    'Municipal Utility: GREENPORT',
    'Municipal Utility: ROCKVILLE CENTRE',
    'Municipal Utility: FREEPORT',
  ];

  const getOptionsForCategory = (category: string): string[] => {
    switch (category) {
      case 'County':
        return counties; // your 62-county array
      case 'Region':
        return nyRegions; // your region list
      case 'Utility Service Territory':
        return utilityServiceTerritories; // the list from earlier
      case 'State Senate District':
        return Array.from(
          { length: 63 },
          (_, i) => `State Senate District ${i + 1}`,
        );
      case 'Assembly District':
        return Array.from(
          { length: 150 },
          (_, i) => `Assembly District ${i + 1}`,
        );
      default:
        return [];
    }
  };

  const options = getOptionsForCategory(props.category);

  const handleApplyButtonClick = () => {
    props.handleFilterButtonClick();
    props.setActiveFilter(null);
  };

  return (
    <PanelContainer>
      <CategoryInnerContainer>
        <PanelHeader>
          <BackArrowWithTitleContainer>
            <BackArrowIconButton onClick={props.onBack}>
              <BackArrowIcon />
            </BackArrowIconButton>
            <PanelTitle>{props.category}</PanelTitle>
          </BackArrowWithTitleContainer>
          <CloseIconButton
            onClick={() => props.handleButtonClick(props.currFilter)}
          >
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
              onClick={() => {
                props.setSelectedLocationFilters([item]);
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
          onClick={props.clearFilters}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </ApplyClearButtonContainer>
    </PanelContainer>
  );
}
