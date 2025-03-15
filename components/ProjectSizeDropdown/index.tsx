import { useState } from 'react';
import { ApplyFiltersText, FilterHeadingUnused } from '@/styles/texts';
import { FilterType, projectSizeType } from '@/types/schema';
import { ExitIcon } from '../../assets/Dropdown-Icons/icons';
import ProjectSizeHistogram from '../ProjectSizeHistogram';
import {
  ApplyButtonStyles,
  BlueTextStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  ExitStyles,
  FilterCategoryText1WithPadding,
  FilterContentDiv,
  FilterDropdownStyles,
  FilterIconStyles,
  Label,
  MinMaxBox,
  MinMaxBoxContainer,
  Value,
} from './styles';

interface ProjectSizeDropdownProps {
  setSelectedSize: (projectSize: projectSizeType) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  handleFilterButtonClick: () => void;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  projectSizes: number[];
  minRange: number;
  setMinRange: (value: number) => void;
  maxRange: number;
  setMaxRange: (value: number) => void;
}

export default function ProjectSizeDropdown({
  setSelectedSize,
  handleButtonClick,
  icon,
  label,
  currFilter,
  handleFilterButtonClick,
  setActiveFilter,
  projectSizes,
  minRange,
  setMinRange,
  maxRange,
  setMaxRange,
}: ProjectSizeDropdownProps) {
  const [minSize, setMinSize] = useState(Math.min(...projectSizes));
  const [maxSize, setMaxSize] = useState(Math.max(...projectSizes));

  const averageProjectSize = (
    projectSizes.reduce((a, b) => a + b) / projectSizes.length
  ).toFixed(2);

  const handleApplyButtonClick = () => {
    handleFilterButtonClick();
    setActiveFilter(null);
  };

  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          <FilterIconStyles>{icon}</FilterIconStyles>
          <ButtonStyles>
            <FilterHeadingUnused>{label}</FilterHeadingUnused>
          </ButtonStyles>
          <ExitStyles>
            <ExitIcon />
          </ExitStyles>
        </ButtonWithIconStyles>

        <FilterCategoryText1WithPadding>
          The average expected project output is{' '}
          <BlueTextStyles>{averageProjectSize} MW</BlueTextStyles>.
        </FilterCategoryText1WithPadding>

        <ProjectSizeHistogram
          projectSizes={projectSizes}
          setMinSize={setMinSize}
          setMaxSize={setMaxSize}
          minRange={minRange}
          setMinRange={setMinRange}
          maxRange={maxRange}
          setMaxRange={setMaxRange}
          setSelectedSize={setSelectedSize}
        ></ProjectSizeHistogram>

        <MinMaxBoxContainer>
          <MinMaxBox>
            <Label>Minimum</Label>
            <Value>{minSize} MW</Value>
          </MinMaxBox>
          <MinMaxBox>
            <Label>Maximum</Label>
            <Value>{maxSize} MW</Value>
          </MinMaxBox>
        </MinMaxBoxContainer>

        <ApplyButtonStyles $isActive={true} onClick={handleApplyButtonClick}>
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
