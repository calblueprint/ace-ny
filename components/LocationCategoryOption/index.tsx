import React from 'react';
import {
  SelectedRadioIcon,
  UnselectedRadioIcon,
} from '../../assets/Location-Category-Icons/icons';
import { LocationOptionText } from '../../styles/texts';
import { OptionContainer } from './styles';

export default function LocationCategoryOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <OptionContainer onClick={onClick}>
      {selected ? <SelectedRadioIcon /> : <UnselectedRadioIcon />}
      <LocationOptionText>{label}</LocationOptionText>
    </OptionContainer>
  );
}
