import { FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import { FilterHeadingUnused, FilterNameText } from '../../styles/texts';
import {
  ButtonStyles,
  ButtonWithIconStyles,
  ExitStyles,
  FilterContentDiv,
  FilterDropdownStyles,
} from './styles';

export default function LocationDropdown({
  handleButtonClick,
  icon,
  label,
  currFilter,
  clearFilters,
}: {
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearFilters: () => void;
}) {
  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          <FilterNameText>
            <FilterHeadingUnused>{icon}</FilterHeadingUnused>
          </FilterNameText>
          <ButtonStyles>
            <FilterNameText>{label}</FilterNameText>
          </ButtonStyles>
          <ExitStyles onClick={clearFilters}>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
