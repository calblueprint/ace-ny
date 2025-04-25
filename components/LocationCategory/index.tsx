import React from 'react';
import { ArrowIcon } from '../../assets/Location-Category-Icons/icons';
import { LocationCategoryText } from '../../styles/texts';
import {
  Arrow,
  IconTextContainer,
  LocationCategoryContent,
  LocationCategoryIcon,
} from './styles';

interface LocationCategoryProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  appliedCategory: string | null;
}

export default function LocationCategory(props: LocationCategoryProps) {
  console.log('selected?', props.name === props.appliedCategory);
  return (
    <LocationCategoryContent onClick={props.onClick}>
      <IconTextContainer>
        <LocationCategoryIcon>{props.icon}</LocationCategoryIcon>
        <LocationCategoryText selected={props.name === props.appliedCategory}>
          {props.name}
        </LocationCategoryText>
      </IconTextContainer>
      <Arrow>
        <ArrowIcon />
      </Arrow>
    </LocationCategoryContent>
  );
}
