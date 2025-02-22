import { FilterHeadingUnused } from '@/styles/texts';
import { FilterType, projectSizeType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import {
  ButtonStyles,
  ButtonWithIconStyles,
  ExitStyles,
  FilterContentDiv,
  FilterDropdownStyles,
  FilterIconStyles,
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
        <ButtonWithIconStyles>
          <FilterIconStyles onClick={() => handleButtonClick(currFilter)}>
            {icon}
          </FilterIconStyles>
          <ButtonStyles onClick={() => handleButtonClick(currFilter)}>
            <FilterHeadingUnused>{label}</FilterHeadingUnused>
          </ButtonStyles>
          <ExitStyles>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
