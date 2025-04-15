import React from 'react';
import {
  SelectedRadioIcon,
  UnselectedRadioIcon,
} from '../../assets/Location-Category-Icons/icons';
import { LocationOptionText } from '../../styles/texts';
import { OptionContainer } from './styles';

interface LocationCategoryOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function LocationCategoryOption(
  props: LocationCategoryOptionProps,
) {
  const { label, selected, onClick } = props;

  return (
    <OptionContainer onClick={onClick}>
      {selected ? <SelectedRadioIcon /> : <UnselectedRadioIcon />}
      <LocationOptionText>{label}</LocationOptionText>
    </OptionContainer>
  );
}
