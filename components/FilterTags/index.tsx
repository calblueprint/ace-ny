import React from 'react';
import { FilterTagText } from '@/styles/texts';
import { Filters } from '../../types/schema';
import { TagContainer, TagStyles } from './styles';

export default function FilterTags({
  selectedFilters,
  defaultProjectSize,
  minSize,
  maxSize,
}: {
  selectedFilters: Filters;
  defaultProjectSize: {
    min: number;
    max: number;
  };
  minSize: number;
  maxSize: number;
}) {
  const { status, technology, location, projectSize } = selectedFilters;

  console.log('selectedFilters', selectedFilters);
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
      value: `${minSize} - ${maxSize}`,
    });
  }
  return (
    <TagContainer>
      {selectedItems.map((item, index) => (
        <TagStyles key={index}>
          <FilterTagText>{item.value}</FilterTagText>
        </TagStyles>
      ))}
    </TagContainer>
  );
}
