import { FiltersApplied, FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import COLORS from '../../styles/colors';
import {
  ApplyFiltersText,
  ClearFiltersText,
  FilterHeadingUnused,
  FilterNameText,
  FilterOptionsText,
} from '../../styles/texts';
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
  OptionTitleStyles,
} from './styles';

export default function StatusDropdown({
  selectedStatus,
  setSelectedStatus,
  handleButtonClick,
  icon,
  label,
  currFilter,
  handleFilterButtonClick,
  clearFilters,
  setActiveFilter,
  setLastAppliedFilter,
  setFiltersApplied,
}: {
  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  handleFilterButtonClick: () => void;
  clearFilters: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
  setFiltersApplied: React.Dispatch<React.SetStateAction<FiltersApplied>>;
}) {
  const handleApplyButtonClick = () => {
    handleFilterButtonClick();
    setActiveFilter(null);
    setLastAppliedFilter('status');
    setFiltersApplied((prevState: FiltersApplied) => ({
      ...prevState,
      status: true,
    }));
  };

  const filterOptions = [
    { title: 'Proposed', color: `${COLORS.ashGrey}` },
    { title: 'Operational', color: `${COLORS.chateauGreen}` },
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(selectedStatus[0] === status ? [] : [status]);
    setFiltersApplied((prevState: FiltersApplied) => ({
      ...prevState,
      status: false,
    }));
  };

  const isApplyButtonActive = selectedStatus.length > 0;

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
        <div>
          {filterOptions.map(option => (
            <CheckboxContainer key={option.title}>
              <CheckboxStyles
                type="radio"
                checked={selectedStatus.includes(option.title)}
                onChange={() => handleStatusChange(option.title)}
              />
              <OptionTitleStyles color={option.color}>
                <FilterOptionsText $color={option.color}>
                  {' '}
                  {option.title}
                </FilterOptionsText>
              </OptionTitleStyles>
            </CheckboxContainer>
          ))}
        </div>
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
