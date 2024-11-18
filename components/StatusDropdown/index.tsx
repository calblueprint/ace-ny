import React from 'react'; //REMOVE
import { FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import COLORS from '../../styles/colors';
import {
  ApplyFiltersText,
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
  ExitStyles,
  FilterContentDiv,
  FilterDropdownStyles,
  OptionTitleStyles,
} from './styles';

interface StatusDropdownProps {
  selectedStatus: string[];
  setSelectedStatus: (status: string[]) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
}

export default function StatusDropdown({
  selectedStatus,
  setSelectedStatus,
  handleButtonClick,
  icon,
  label,
  currFilter,
}: StatusDropdownProps) {
  const filterOptions = [
    { title: 'In Progress', color: `${COLORS.ashGrey}` },
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
          <FilterNameText>
            <FilterHeadingUnused>{icon}</FilterHeadingUnused>
          </FilterNameText>
          <ButtonStyles>
            <FilterNameText>{label}</FilterNameText>
          </ButtonStyles>
          <ExitStyles>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>
        <div>
          {filterOptions.map(option => (
            <CheckboxContainer key={option.title}>
              <CheckboxStyles
                type="checkbox"
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
        <ApplyButtonStyles isActive={isApplyButtonActive}>
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
