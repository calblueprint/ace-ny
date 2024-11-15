import React from 'react'; //REMOVE
import { FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import {
  ApplyButtonStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  CheckboxContainer,
  CheckboxStyles,
  ExitStyles,
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
  const filterOptions = [{ title: 'In Progress' }, { title: 'Operational' }];

  // Function to handle status change, ensuring only one option can be selected
  const handleStatusChange = (status: string) => {
    setSelectedStatus(selectedStatus[0] === status ? [] : [status]);
  };

  // Determine if any status is selected
  const isApplyButtonActive = selectedStatus.length > 0;

  return (
    <FilterDropdownStyles>
      <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
        {icon}
        <ButtonStyles>{label}</ButtonStyles>
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
            <OptionTitleStyles>{option.title}</OptionTitleStyles>
          </CheckboxContainer>
        ))}
      </div>

      {/* Apply Button with conditional styling */}
      <ApplyButtonStyles isActive={isApplyButtonActive}>
        APPLY
      </ApplyButtonStyles>
    </FilterDropdownStyles>
  );
}
