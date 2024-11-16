import { FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
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
  CategoryDiv,
  CategoryTitleStyles,
  CheckboxContainer,
  CheckboxStyles,
  ExitStyles,
  FilterContentDiv,
  FilterDropdownStyles,
  IconStyles,
  OptionTitleStyles,
} from './styles';

interface TechnologyDropdownProps {
  selectedTechnologies: string[];
  setSelectedTechnologies: (technologies: string[]) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
}

export default function TechnologyDropdown({
  selectedTechnologies,
  setSelectedTechnologies,
  handleButtonClick,
  icon,
  label,
  currFilter,
}: TechnologyDropdownProps) {
  const filter = {
    categories: [
      {
        category: 'SOURCE',
        options: [
          {
            title: 'Land-based Wind',
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
  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          {icon}
          <ButtonStyles>{label}</ButtonStyles>
          <ExitStyles>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>
        {filter.categories.map(category => (
          <CategoryDiv key={category.category}>
            <CategoryTitleStyles>{category.category}</CategoryTitleStyles>
            {category.options.map(option => (
              <CheckboxContainer key={option.title}>
                {option.icon}
                <OptionTitleStyles>{option.title}</OptionTitleStyles>
                <CheckboxStyles
                  type="checkbox"
                  checked={selectedTechnologies.includes(option.title)}
                  onChange={() => {
                    setSelectedTechnologies(
                      selectedTechnologies.includes(option.title)
                        ? selectedTechnologies.filter(o => o !== option.title)
                        : [...selectedTechnologies, option.title],
                    );
                  }}
                />
              </CheckboxContainer>
            ))}
          </CategoryDiv>
        ))}
        <ApplyButtonStyles>APPLY</ApplyButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
