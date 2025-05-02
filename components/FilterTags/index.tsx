import React from 'react';
import { FilterTagText } from '@/styles/texts';
import { ClearIcon } from '../../assets/Dropdown-Icons/icons';
import { Filters } from '../../types/schema';
import { TagButtonContainer, TagButtonStyles } from './styles';

export default function FilterTags({
  selectedFilters,
  defaultProjectSize,
}: {
  selectedFilters: Filters;
  defaultProjectSize: {
    min: number;
    max: number;
  };
}) {
  const { status, technology, location, projectSize } = selectedFilters;

  const selectedItems = [
    ...status.map(s => ({ type: 'Status', value: s })),
    ...technology.map(t => ({ type: 'Technology', value: t })),
    ...location.map(l => ({ type: 'Location', value: l })),
  ];

  if (
    projectSize.min > defaultProjectSize.min ||
    projectSize.max < defaultProjectSize.max
  ) {
    selectedItems.push({
      type: 'Project Size',
      value: `${projectSize.min} - ${projectSize.max}`,
    });
  }
  return (
    <TagButtonContainer>
      {selectedItems.map((item, index) => (
        <TagButtonStyles key={index}>
          <FilterTagText>{item.value}</FilterTagText>
          <ClearIcon width={'7'} height={'7'} />
        </TagButtonStyles>
      ))}
    </TagButtonContainer>
  );
}
