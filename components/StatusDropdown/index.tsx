import { Filters, FilterType } from '@/types/schema';
import {
  CollapseIcon,
  ExitIconApplied,
} from '../../assets/Dropdown-Icons/icons';
import COLORS from '../../styles/colors';
import {
  ApplyFiltersText,
  ClearFiltersText,
  FilterHeadingInUse,
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
  iconApplied,
  label,
  currFilter,
  clearFilters,
  setActiveFilter,
  setStatusFiltersApplied,
  statusFiltersApplied,
  setLastAppliedFilter,
}: {
  tempFilters: Filters;
  selectedStatus: string[];
  setSelectedStatus: (args: { value: string[]; isTemp: boolean }) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  iconApplied: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearFilters: (filterName?: keyof Filters) => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  setStatusFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>;
  statusFiltersApplied: boolean;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleApplyButtonClick = () => {
    // handleFilterButtonClick();
    setSelectedStatus({ value: tempFilters.status, isTemp: false });
    setActiveFilter(null);
    setStatusFiltersApplied(true);
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
          {statusFiltersApplied ? ( // If the filter is applied
            <>
              <FilterNameText>
                <FilterHeadingInUse>{iconApplied}</FilterHeadingInUse>
              </FilterNameText>
              <ButtonStyles>
                <FilterNameText>
                  <FilterHeadingInUse>{label}</FilterHeadingInUse>
                </FilterNameText>
              </ButtonStyles>
              <ExitStyles
                onClick={() => {
                  clearFilters('status');
                  setStatusFiltersApplied(false);
                }}
              >
                <ExitIconApplied />
              </ExitStyles>
            </>
          ) : (
            <>
              <FilterNameText>
                <FilterHeadingUnused>{icon}</FilterHeadingUnused>
              </FilterNameText>
              <ButtonStyles>
                <FilterNameText>
                  <FilterHeadingUnused>{label}</FilterHeadingUnused>
                </FilterNameText>
              </ButtonStyles>
              <ExitStyles>
                <CollapseIcon />
              </ExitStyles>
            </>
          )}
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
          onClick={() => {
            clearFilters('status');
            setStatusFiltersApplied(false);
          }}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
