import { ApplyFiltersText, FilterHeadingUnused } from '@/styles/texts';
import { FilterType, projectSizeType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import {
  ApplyButtonStyles,
  BlueTextStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  ExitStyles,
  FilterCategoryText1WithPadding,
  FilterContentDiv,
  FilterDropdownStyles,
  FilterIconStyles,
  Label,
  MinMaxBox,
  MinMaxBoxContainer,
  Value,
} from './styles';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default function ProjectSizeDropdown({
  selectedSize,
  setSelectedSize,
  handleButtonClick,
  icon,
  label,
  currFilter,
  handleFilterButtonClick,
  clearFilters,
  setActiveFilter,
}: {
  selectedSize: projectSizeType;
  setSelectedSize: (projectSize: projectSizeType) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  handleFilterButtonClick: () => void;
  clearFilters: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
}) {
  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          <FilterIconStyles>{icon}</FilterIconStyles>
          <ButtonStyles>
            <FilterHeadingUnused>{label}</FilterHeadingUnused>
          </ButtonStyles>
          <ExitStyles>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>

        <FilterCategoryText1WithPadding>
          The average expected project output is{' '}
          <BlueTextStyles>2900 MW</BlueTextStyles>.
        </FilterCategoryText1WithPadding>

        <MinMaxBoxContainer>
          <MinMaxBox>
            <Label>Minimum</Label>
            <Value>100 MW</Value>
          </MinMaxBox>
          <MinMaxBox>
            <Label>Maximum</Label>
            <Value>12,000 MW</Value>
          </MinMaxBox>
        </MinMaxBoxContainer>

        <ApplyButtonStyles $isActive={true} onClick={handleFilterButtonClick}>
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
