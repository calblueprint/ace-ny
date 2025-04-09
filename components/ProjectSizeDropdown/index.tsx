import { useState } from 'react';
import {
  ApplyFiltersText,
  ClearFiltersText,
  FilterHeadingUnused,
} from '@/styles/texts';
import { Filters, FilterType, ProjectSizeType } from '@/types/schema';
import { CollapseIcon } from '../../assets/Dropdown-Icons/icons';
import ProjectSizeHistogram from '../ProjectSizeHistogram';
import {
  ApplyButtonStyles,
  BlueTextStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  ClearButtonStyles,
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
  tempFilters: Filters;
  setSelectedSize: (args: { value: ProjectSizeType; isTemp: boolean }) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  label: string;
  currFilter: FilterType;
  setActiveFilter: React.Dispatch<React.SetStateAction<FilterType | null>>;
  projectSizes: number[];
  minDefault: number;
  setMinDefault: (value: number) => void;
  maxDefault: number;
  setMaxDefault: (value: number) => void;
  setLastAppliedFilter: React.Dispatch<React.SetStateAction<string>>;
  minBound: number;
  maxBound: number;
}

export default function ProjectSizeDropdown({
  tempFilters,
  setSelectedSize,
  handleButtonClick,
  icon,
  label,
  currFilter,
  setActiveFilter,
  projectSizes,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
  setLastAppliedFilter,
  minBound,
  maxBound,
}: ProjectSizeDropdownProps) {
  const [minSize, setMinSize] = useState(Math.min(...projectSizes));
  const [maxSize, setMaxSize] = useState(Math.max(...projectSizes));

  const averageProjectSize = (
    projectSizes.reduce((a, b) => a + b) / projectSizes.length
  ).toFixed(2);

  const handleApplyButtonClick = () => {
    setSelectedSize({ value: tempFilters.projectSize, isTemp: false });
    setActiveFilter(null);
    setLastAppliedFilter('projectSize');
  };

  // const clearButtonHandler = () => {
  //   setMinDefault(minBound);
  //   setMaxDefault(maxBound);
  //   setSelectedSize({
  //     min: minBound,
  //     max: maxBound,
  //   });
  // }

  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          <FilterIconStyles>{icon}</FilterIconStyles>
          <ButtonStyles>
            <FilterHeadingUnused>{label}</FilterHeadingUnused>
          </ButtonStyles>
          <ExitStyles>
            <CollapseIcon />
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
          minDefault={minDefault}
          setMinDefault={setMinDefault}
          maxDefault={maxDefault}
          setMaxDefault={setMaxDefault}
          setSelectedSize={setSelectedSize}
          minBound={minBound}
          maxBound={maxBound}
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

        <ClearButtonStyles $isActive={true} onClick={() => null}>
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
