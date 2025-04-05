import { useState } from 'react';
import { FilterType } from '@/types/schema';
import { UpIcon } from '../../assets/Dropdown-Icons/icons';
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
  handleButtonClick,
  icon,
  label,
  currFilter,
}: {
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearFilters: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <LocationStyleDiv>
      <LocationContentDiv>
        {activeCategory === null ? (
          <>
            <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
              <LocationIconWithTestContainer>
                <FilterNameText>
                  <FilterHeadingUnused>{icon}</FilterHeadingUnused>
                </FilterNameText>
                <ButtonStyles>
                  <FilterLocationText>{label}</FilterLocationText>
                </ButtonStyles>
              </LocationIconWithTestContainer>
              <UpIcon />
            </ButtonWithIconStyles>

            <CategoryComponentContainer>
              <LocationCategory
                icon={<CountyIcon />}
                name="County"
                onClick={() => setActiveCategory('County')}
              />
              <LocationCategory
                icon={<TownIcon />}
                name="Town"
                onClick={() => setActiveCategory('Town')}
              />
              <LocationCategory
                icon={<RegionIcon />}
                name="Region"
                onClick={() => setActiveCategory('Region')}
              />
              <LocationCategory
                icon={<UtilityServiceTerritoryIcon />}
                name="Utility Service Territory"
                onClick={() => setActiveCategory('Utility Service Territory')}
              />
              <LocationCategory
                icon={<StateSenateDistrictIcon />}
                name="State Senate District"
                onClick={() => setActiveCategory('State Senate District')}
              />
              <LocationCategory
                icon={<AssemblyDistrictIcon />}
                name="Assembly District"
                onClick={() => setActiveCategory('Assembly District')}
              />
            </CategoryComponentContainer>
          </>
        ) : (
          <LocationCategoryPanel
            category={activeCategory}
            onBack={() => setActiveCategory(null)}
          />
        )}
      </LocationContentDiv>
    </LocationStyleDiv>
  );
}
