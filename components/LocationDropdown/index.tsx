import { useEffect, useState } from 'react';
import { queryNamesForCategory } from '@/api/supabase/queries/query';
import { Filters, FilterType } from '@/types/schema';
import {
  CollapseIcon,
  CollapseIconApplied,
} from '../../assets/Dropdown-Icons/icons';
import {
  AssemblyDistrictIcon,
  CountyIcon,
  RegionIcon,
  StateSenateDistrictIcon,
  TownIcon,
  UtilityServiceTerritoryIcon,
} from '../../assets/Location-Category-Icons/icons';
import {
  ClearFiltersText,
  FilterHeadingInUse,
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
  ClearButtonStyles,
  LocationContentDiv,
  LocationIconWithTestContainer,
  LocationStyleDiv,
} from './styles';

export default function LocationDropdown({
  handleButtonClick,
  icon,
  label,
  currFilter,
  clearButtonHandler,
  selectedLocationFilters,
  setSelectedLocationFilters,
  setActiveLocationCategory,
  applyButtonHandler,
  appliedCategory,
  setAppliedCategory,
  iconApplied,
  locationFiltersApplied,
  map,
  currentPolygons,
  setCurrentPolygons,
  locationFieldClicked,
  setLocationFieldClicked,
}: {
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearButtonHandler: (filter: keyof Filters) => void;
  selectedLocationFilters: string[];
  setSelectedLocationFilters: (args: {
    value: string[];
    isTemp: boolean;
  }) => void;
  setActiveLocationCategory: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  appliedCategory: string | null;
  setAppliedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  applyButtonHandler: (filter: keyof Filters) => void;
  iconApplied: React.ReactNode;
  locationFiltersApplied: boolean;
  map: google.maps.Map | null;
  currentPolygons: google.maps.Polygon[] | null;
  setCurrentPolygons: React.Dispatch<
    React.SetStateAction<google.maps.Polygon[] | null>
  >;
  locationFieldClicked: Record<string, boolean>;
  setLocationFieldClicked: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const locationCategories = [
    'County',
    'Town',
    'Region',
    'Utility Service Territory',
    'State Senate District',
    'Assembly District',
  ];

  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedLocationFilters[0] ?? null,
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const [categoryOptionsMap, setCategoryOptionsMap] = useState({});

  const clearButtonHandlerGlobalLocation = () => {
    clearButtonHandler('location');
    setSelectedItem(null);
    Object.keys(locationFieldClicked).forEach(key => {
      locationFieldClicked[key] = false;
    });
    setLocationFieldClicked(locationFieldClicked);
  };

  useEffect(() => {
    const fetchAllCategoryOptions = async () => {
      const results = await Promise.all(
        locationCategories.map(async category => {
          const data = await queryNamesForCategory(category);
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
              {locationFiltersApplied ? (
                <FilterHeadingInUse>{iconApplied}</FilterHeadingInUse>
              ) : (
                <FilterHeadingUnused>{icon}</FilterHeadingUnused>
              )}
            </FilterNameText>
            <ButtonStyles>
              {locationFiltersApplied ? (
                <FilterHeadingInUse>{label}</FilterHeadingInUse>
              ) : (
                <FilterLocationText>{label}</FilterLocationText>
              )}
            </ButtonStyles>
          </LocationIconWithTestContainer>
          {locationFiltersApplied ? <CollapseIconApplied /> : <CollapseIcon />}
        </ButtonWithIconStyles>

        <CategoryComponentContainer>
          <LocationCategory
            icon={<RegionIcon />}
            name="Region"
            onClick={() => {
              setActiveLocationCategory('Region');
              setActiveCategory('Region');
            }}
            appliedCategory={appliedCategory}
          />
          <LocationCategory
            icon={<CountyIcon />}
            name="County"
            onClick={() => {
              setActiveLocationCategory('County');
              setActiveCategory('County');
            }}
            appliedCategory={appliedCategory}
          />
          <LocationCategory
            icon={<TownIcon />}
            name="Town"
            onClick={() => {
              setActiveLocationCategory('Town');
              setActiveCategory('Town');
            }}
            appliedCategory={appliedCategory}
          />
          <LocationCategory
            icon={<UtilityServiceTerritoryIcon />}
            name="Utility Service Territory"
            onClick={() => {
              setActiveLocationCategory('Utility Service Territory');
              setActiveCategory('Utility Service Territory');
            }}
            appliedCategory={appliedCategory}
          />
          <LocationCategory
            icon={<StateSenateDistrictIcon />}
            name="State Senate District"
            onClick={() => {
              setActiveLocationCategory('State Senate District');
              setActiveCategory('State Senate District');
            }}
            appliedCategory={appliedCategory}
          />
          <LocationCategory
            icon={<AssemblyDistrictIcon />}
            name="Assembly District"
            onClick={() => {
              setActiveLocationCategory('Assembly District');
              setActiveCategory('Assembly District');
            }}
            appliedCategory={appliedCategory}
          />
        </CategoryComponentContainer>
        <ClearButtonStyles
          $isActive={selectedItem !== null}
          onClick={clearButtonHandlerGlobalLocation}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </LocationContentDiv>
    </LocationStyleDiv>
  ) : (
    <LocationCategoryPanel
      category={activeCategory}
      onBack={() => setActiveCategory(null)}
      handleButtonClick={handleButtonClick}
      currFilter={currFilter}
      clearButtonHandler={clearButtonHandler}
      selectedLocationFilters={selectedLocationFilters}
      setSelectedLocationFilters={setSelectedLocationFilters}
      categoryOptionsMap={categoryOptionsMap}
      activeCategory={activeCategory}
      setAppliedCategory={setAppliedCategory}
      applyButtonHandler={applyButtonHandler}
      map={map}
      currentPolygons={currentPolygons}
      setCurrentPolygons={setCurrentPolygons}
      locationFieldClicked={locationFieldClicked}
      setLocationFieldClicked={setLocationFieldClicked}
    />
  );
}
