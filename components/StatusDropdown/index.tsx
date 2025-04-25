import { Filters, FilterType } from '@/types/schema';
import {
  CollapseIcon,
  CollapseIconApplied,
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
  CollapseStyles,
  FilterContentDiv,
  FilterDropdownStyles,
  OptionTitleStyles,
} from './styles';

export default function StatusDropdown({
  selectedStatus,
  setSelectedStatus,
  handleButtonClick,
  icon,
  iconApplied,
  label,
  currFilter,
  clearButtonHandler,
  statusFiltersApplied,
  applyButtonHandler,
}: {
  selectedStatus: string[];
  setSelectedStatus: (args: { value: string[]; isTemp: boolean }) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  iconApplied: React.ReactNode;
  label: string;
  currFilter: FilterType;
  clearButtonHandler: (filter: keyof Filters) => void;
  statusFiltersApplied: boolean;
  applyButtonHandler: (filter: keyof Filters) => void;
}) {
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
          {statusFiltersApplied ? (
            <>
              <FilterNameText>
                <FilterHeadingInUse>{iconApplied}</FilterHeadingInUse>
              </FilterNameText>
              <ButtonStyles>
                <FilterNameText>
                  <FilterHeadingInUse>{label}</FilterHeadingInUse>
                </FilterNameText>
              </ButtonStyles>
              <CollapseStyles>
                <CollapseIconApplied />
              </CollapseStyles>
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
              <CollapseStyles>
                <CollapseIcon />
              </CollapseStyles>
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
          onClick={() => applyButtonHandler('status')}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
        <ClearButtonStyles
          $isActive={isApplyButtonActive}
          onClick={() => clearButtonHandler('status')}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
