import { useEffect, useState } from 'react';
import { queryOptionsForCategory } from '@/api/supabase/queries/query';
import { Filters, FilterType } from '@/types/schema';
import { CollapseIcon } from '../../assets/Dropdown-Icons/icons';
import {
  AssemblyDistrictIcon,
  CountyIcon,
  RegionIcon,
  StateSenateDistrictIcon,
  TownIcon,
  UtilityServiceTerritoryIcon,
} from '../../assets/Location-Category-Icons/icons';
import {
  FilterHeadingUnused,
  FilterLocationText,
  FilterNameText,
} from '../../styles/texts';
import LocationCategory from '../LocationCategory';
import LocationCategoryPanel from '../LocationCategoryPanel';
import {
  ButtonStyles,
  ButtonWithIconStyles,
  CategoryComponentContainer,
  LocationContentDiv,
  LocationIconWithTestContainer,
  LocationStyleDiv,
} from './styles';

export default function LocationDropdown({
  tempFilters,
  handleButtonClick,
  icon,
  label,
  currFilter,
  clearFilters,
  selectedLocationFilters,
  setSelectedLocationFilters,
  setActiveFilter,
  setActiveLocationCategory,
  setLastAppliedFilter,
}: {
  tempFilters: Filters;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearFilters: (filterName?: keyof Filters) => void;
  selectedLocationFilters: string[];
  setSelectedLocationFilters: (args: {
    value: string[];
    isTemp: boolean;
  }) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const locationCategories = [
    'County',
    'Town',
    'Region',
    'Utility Service Territory',
    'State Senate District',
    'Assembly District',
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [categoryOptionsMap, setCategoryOptionsMap] = useState({});

  useEffect(() => {
    const fetchAllCategoryOptions = async () => {
      const results = await Promise.all(
        locationCategories.map(async category => {
          const data = await queryOptionsForCategory(category);
          return [category, data];
        }),
      );
      const resultObj = Object.fromEntries(results);
      setCategoryOptionsMap(resultObj);
    };

    fetchAllCategoryOptions();
  }, []);

  return activeCategory === null ? (
    <LocationStyleDiv>
      <LocationContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          <LocationIconWithTestContainer>
            <FilterNameText>
              <FilterHeadingUnused>{icon}</FilterHeadingUnused>
            </FilterNameText>
            <ButtonStyles>
              <FilterLocationText>{label}</FilterLocationText>
            </ButtonStyles>
          </LocationIconWithTestContainer>
          <CollapseIcon />
        </ButtonWithIconStyles>

        <CategoryComponentContainer>
          <LocationCategory
            icon={<CountyIcon />}
            name="County"
            onClick={() => {
              setActiveLocationCategory('County');
              setActiveCategory('County');
            }}
          />
          <LocationCategory
            icon={<TownIcon />}
            name="Town"
            onClick={() => {
              setActiveLocationCategory('Town');
              setActiveCategory('Town');
            }}
          />
          <LocationCategory
            icon={<RegionIcon />}
            name="Region"
            onClick={() => {
              setActiveLocationCategory('Region');
              setActiveCategory('Region');
            }}
          />
          <LocationCategory
            icon={<UtilityServiceTerritoryIcon />}
            name="Utility Service Territory"
            onClick={() => {
              setActiveLocationCategory('Utility Service Territory');
              setActiveCategory('Utility Service Territory');
            }}
          />
          <LocationCategory
            icon={<StateSenateDistrictIcon />}
            name="State Senate District"
            onClick={() => {
              setActiveLocationCategory('State Senate District');
              setActiveCategory('State Senate District');
            }}
          />
          <LocationCategory
            icon={<AssemblyDistrictIcon />}
            name="Assembly District"
            onClick={() => {
              setActiveLocationCategory('Assembly District');
              setActiveCategory('Assembly District');
            }}
          />
        </CategoryComponentContainer>
      </LocationContentDiv>
    </LocationStyleDiv>
  ) : (
    <LocationCategoryPanel
      tempFilters={tempFilters}
      category={activeCategory}
      onBack={() => setActiveCategory(null)}
      handleButtonClick={handleButtonClick}
      currFilter={currFilter}
      clearFilters={clearFilters}
      selectedLocationFilters={selectedLocationFilters}
      setSelectedLocationFilters={setSelectedLocationFilters}
      setActiveFilter={setActiveFilter}
      categoryOptionsMap={categoryOptionsMap}
      setLastAppliedFilter={setLastAppliedFilter}
    />
  );
}
