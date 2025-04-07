import React from 'react';
import { FilterType } from '@/types/schema';
import { ExitIcon, ExitIconApplied } from '../../assets/Dropdown-Icons/icons';
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
  selectedStatus,
  setSelectedStatus,
  handleButtonClick,
  icon,
  iconApplied,
  label,
  currFilter,
  handleFilterButtonClick,
  clearFilters,
  setActiveFilter,
  setStatusFiltersApplied,
  statusFiltersApplied,
}: {
  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  iconApplied: React.ReactNode;
  label: string;
  currFilter: FilterType;
  handleFilterButtonClick: () => void;
  clearFilters: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  setStatusFiltersApplied: React.Dispatch<React.SetStateAction<boolean>>;
  statusFiltersApplied: boolean;
}) {
  const handleApplyButtonClick = () => {
    handleFilterButtonClick();
    setActiveFilter(null);
    setStatusFiltersApplied(true);
  };

  const filterOptions = [
    { title: 'Proposed', color: `${COLORS.ashGrey}` },
    { title: 'Operational', color: `${COLORS.chateauGreen}` },
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(selectedStatus[0] === status ? [] : [status]);
  };

  const isApplyButtonActive = selectedStatus.length > 0;

  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          {statusFiltersApplied ? ( // If the filter is applied (statusFiltersApplied is true)
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
                  clearFilters();
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
              <ExitStyles onClick={clearFilters}>
                <ExitIcon />
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
            clearFilters();
            setStatusFiltersApplied(false);
          }}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
