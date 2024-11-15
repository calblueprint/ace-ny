import React from 'react'; //REMOVE
import { FilterType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import COLORS from '../../styles/colors';
import {
  ApplyButtonStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  CategoryTitleStyles,
  CheckboxContainer,
  CheckboxStyles,
  ExitStyles,
  FilterDropdownStyles,
  IconStyles,
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
    // Set selected status to the clicked one, deselect if it's already selected
    setSelectedStatus(selectedStatus[0] === status ? [] : [status]);
  };

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
            <OptionTitleStyles>{option.title}</OptionTitleStyles>
            <CheckboxStyles
              type="checkbox"
              checked={selectedStatus.includes(option.title)}
              onChange={() => handleStatusChange(option.title)}
            />
          </CheckboxContainer>
        ))}
      </div>

      <ApplyButtonStyles>APPLY</ApplyButtonStyles>
    </FilterDropdownStyles>
  );
}
