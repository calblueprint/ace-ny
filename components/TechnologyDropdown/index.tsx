import {
  ApplyFiltersText,
  ClearFiltersText,
  FilterCategoryLabel,
  FilterCategoryText1,
  FilterHeadingUnused,
} from '@/styles/texts';
import { Filters, FilterType } from '@/types/schema';
import { CollapseIcon } from '../../assets/Dropdown-Icons/icons';
import {
  EnergyStorageIcon,
  GeothermalIcon,
  HydroelectricIcon,
  LandBasedWindIcon,
  OffshoreWindIcon,
  PumpedStorageIcon,
  SolarPvIcon,
} from '../../assets/Technology-Tag-Icons/icons';
import COLORS from '../../styles/colors';
import {
  ApplyButtonStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  CheckboxContainer,
  CheckboxStyles,
  ClearButtonStyles,
  ExitStyles,
  FilterContentDiv,
  FilterDropdownStyles,
  FilterIconStyles,
  IconStyles,
} from './styles';

export default function TechnologyDropdown({
  tempFilters,
  selectedTechnologies,
  setSelectedTechnologies,
  handleButtonClick,
  icon,
  label,
  currFilter,
  clearFilters,
  setActiveFilter,
  setLastAppliedFilter,
}: {
  tempFilters: Filters;
  selectedTechnologies: string[];
  setSelectedTechnologies: (args: { value: string[]; isTemp: boolean }) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearFilters: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleApplyButtonClick = () => {
    // handleFilterButtonClick();
    setSelectedTechnologies({ value: tempFilters.technology, isTemp: false });
    setActiveFilter(null);
    setLastAppliedFilter('technology');
  };

  const filter = {
    categories: [
      {
        category: 'SOURCE',
        options: [
          {
            title: 'Land-Based Wind',
            icon: (
              <IconStyles>
                <LandBasedWindIcon
                  fill={COLORS.grey}
                  width={'10'}
                  height={'13'}
                />
              </IconStyles>
            ),
          },
          {
            title: 'Hydroelectric',
            icon: (
              <IconStyles>
                <HydroelectricIcon
                  fill={COLORS.grey}
                  width={'14'}
                  height={'10'}
                />
              </IconStyles>
            ),
          },
          {
            title: 'Offshore Wind',
            icon: (
              <IconStyles>
                <OffshoreWindIcon
                  fill={COLORS.grey}
                  stroke={COLORS.veryLightGrey}
                  width={'12'}
                  height={'14'}
                />
              </IconStyles>
            ),
          },
          {
            title: 'Solar PV',
            icon: (
              <IconStyles>
                <SolarPvIcon fill={COLORS.grey} width={'14'} height={'14'} />
              </IconStyles>
            ),
          },
          {
            title: 'Geothermal',
            icon: (
              <IconStyles>
                <GeothermalIcon fill={COLORS.grey} width={'14'} height={'12'} />
              </IconStyles>
            ),
          },
        ],
      },
      {
        category: 'STORAGE',
        options: [
          {
            title: 'Energy Storage',
            icon: (
              <IconStyles>
                <EnergyStorageIcon
                  fill={COLORS.grey}
                  stroke={COLORS.veryLightGrey}
                  width={'13'}
                  height="9"
                />
              </IconStyles>
            ),
          },
          {
            title: 'Pumped Storage',
            icon: (
              <IconStyles>
                <PumpedStorageIcon fill={COLORS.grey} width="12" height="11" />
              </IconStyles>
            ),
          },
        ],
      },
    ],
  };
  const isApplyButtonActive = selectedTechnologies.length > 0;

  function checkBoxClickHandler(title: string): void {
    const value = selectedTechnologies.includes(title)
      ? selectedTechnologies.filter(o => o !== title)
      : [...selectedTechnologies, title];
    setSelectedTechnologies({ value: value, isTemp: true });
  }

  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles>
          <FilterIconStyles onClick={() => handleButtonClick(currFilter)}>
            {icon}
          </FilterIconStyles>
          <ButtonStyles onClick={() => handleButtonClick(currFilter)}>
            <FilterHeadingUnused>{label}</FilterHeadingUnused>
            <ExitStyles>
              <CollapseIcon />
            </ExitStyles>
          </ButtonStyles>
        </ButtonWithIconStyles>
        {filter.categories.map(category => (
          <div key={category.category}>
            <FilterCategoryLabel>{category.category}</FilterCategoryLabel>
            {category.options.map(option => (
              <CheckboxContainer key={option.title}>
                {option.icon}
                <FilterCategoryText1>{option.title}</FilterCategoryText1>
                <CheckboxStyles
                  type="checkbox"
                  checked={selectedTechnologies.includes(option.title)}
                  onChange={() => checkBoxClickHandler(option.title)}
                />
              </CheckboxContainer>
            ))}
          </div>
        ))}
        <ApplyButtonStyles
          $isActive={isApplyButtonActive}
          onClick={handleApplyButtonClick}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
        <ClearButtonStyles
          $isActive={isApplyButtonActive}
          onClick={clearFilters}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
