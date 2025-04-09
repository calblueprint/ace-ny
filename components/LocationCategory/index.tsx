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
}

export default function LocationCategory(props: LocationCategoryProps) {
  return (
    <LocationCategoryContent>
      <IconTextContainer>
        <LocationCategoryIcon>{props.icon}</LocationCategoryIcon>
        <LocationCategoryText>{props.name}</LocationCategoryText>
      </IconTextContainer>
      <Arrow>
        <ArrowIcon />
      </Arrow>
    </LocationCategoryContent>
  );
}
