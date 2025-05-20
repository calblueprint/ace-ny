import { useState } from 'react';
import {
  ApplyFiltersText,
  ClearFiltersText,
  FilterHeadingInUse,
  FilterHeadingUnused,
} from '@/styles/texts';
import { Filters, FilterType, ProjectSizeType } from '@/types/schema';
import {
  CollapseIcon,
  CollapseIconApplied,
} from '../../assets/Dropdown-Icons/icons';
import ProjectSizeHistogram from '../ProjectSizeHistogram';
import {
  ApplyButtonStyles,
  BlueTextStyles,
  ButtonStyles,
  ButtonWithIconStyles,
  ClearButtonStyles,
  CollapseStyles,
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
  setSelectedSize: (args: { value: ProjectSizeType; isTemp: boolean }) => void;
  handleButtonClick: (filter: FilterType) => void;
  icon: React.ReactNode;
  iconApplied: React.ReactNode;
  label: string;
  currFilter: FilterType;
  projectSizes: number[];
  minDefault: number;
  setMinDefault: (value: number) => void;
  maxDefault: number;
  setMaxDefault: (value: number) => void;
  minBound: number;
  maxBound: number;
  clearButtonHandler: (filter: keyof Filters) => void;
  projectSizeFiltersApplied: boolean;
  applyButtonHandler: (filter: keyof Filters) => void;
}

export default function ProjectSizeDropdown({
  setSelectedSize,
  handleButtonClick,
  icon,
  iconApplied,
  label,
  currFilter,
  projectSizes,
  minDefault,
  setMinDefault,
  maxDefault,
  setMaxDefault,
  minBound,
  maxBound,
  clearButtonHandler,
  projectSizeFiltersApplied,
  applyButtonHandler,
}: ProjectSizeDropdownProps) {
  const [minSize, setMinSize] = useState(
    projectSizes.length > 0 ? Math.min(...projectSizes) : 0,
  );
  const [maxSize, setMaxSize] = useState(
    projectSizes.length > 0 ? Math.max(...projectSizes) : 0,
  );

  const filteredSizes = projectSizes.filter(
    size => size >= minSize && size <= maxSize,
  );

  const averageProjectSize =
    filteredSizes.length > 0
      ? (filteredSizes.reduce((a, b) => a + b) / filteredSizes.length).toFixed(
          2,
        )
      : '0.00';

  return (
    <FilterDropdownStyles>
      <FilterContentDiv>
        <ButtonWithIconStyles onClick={() => handleButtonClick(currFilter)}>
          {projectSizeFiltersApplied ? (
            <>
              <FilterIconStyles onClick={() => handleButtonClick(currFilter)}>
                {iconApplied}
              </FilterIconStyles>
              <ButtonStyles onClick={() => handleButtonClick(currFilter)}>
                <FilterHeadingInUse>{label}</FilterHeadingInUse>
                <CollapseStyles>
                  <CollapseIconApplied />
                </CollapseStyles>
              </ButtonStyles>
            </>
          ) : (
            <>
              <FilterIconStyles onClick={() => handleButtonClick(currFilter)}>
                {icon}
              </FilterIconStyles>
              <ButtonStyles onClick={() => handleButtonClick(currFilter)}>
                <FilterHeadingUnused>{label}</FilterHeadingUnused>
                <CollapseStyles>
                  <CollapseIcon />
                </CollapseStyles>
              </ButtonStyles>
            </>
          )}
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

        <ApplyButtonStyles
          $isActive={true}
          onClick={() => applyButtonHandler('projectSize')}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>

        <ClearButtonStyles
          $isActive={true}
          onClick={() => clearButtonHandler('projectSize')}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </FilterContentDiv>
    </FilterDropdownStyles>
  );
}
