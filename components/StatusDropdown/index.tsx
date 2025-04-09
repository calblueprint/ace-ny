import { Filters, FilterType } from '@/types/schema';
import { CollapseIcon } from '../../assets/Dropdown-Icons/icons';
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
  tempFilters,
  selectedStatus,
  setSelectedStatus,
  handleButtonClick,
  icon,
  label,
  currFilter,
  clearFilters,
  setActiveFilter,
  setLastAppliedFilter,
}: {
  tempFilters: Filters;
  selectedStatus: string[];
  setSelectedStatus: (args: { value: string[]; isTemp: boolean }) => void;
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
    setSelectedStatus({ value: tempFilters.status, isTemp: false });
    setActiveFilter(null);
    setLastAppliedFilter('status');
  };

  const filterOptions = [
    { title: 'Proposed', color: `${COLORS.ashGrey}` },
    { title: 'Operational', color: `${COLORS.chateauGreen}` },
  ];

  const handleStatusChange = (status: string) => {
    const value = selectedStatus[0] === status ? [] : [status];
    setSelectedStatus({ value: value, isTemp: true });
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
          <ExitStyles>
            <CollapseIcon />
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
