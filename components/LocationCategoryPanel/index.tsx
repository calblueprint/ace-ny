import React, { useState } from 'react';
import {
  BackArrowIcon,
  CloseIcon,
  SearchIcon,
} from '../../assets/Location-Category-Icons/icons';

interface LocationCategoryPanelProps {
  onBack: () => void;
  category: string;
}

export default function LocationCategoryPanel(
  props: LocationCategoryPanelProps,
) {
  const [itemSelected, setItemSelected] = useState<string | null>(null);
  return (
    <PanelContainer>
      <PanelHeader></PanelHeader>
      <SearchBar></SearchBar>
      <ItemContainer></ItemContainer>
    </PanelContainer>
  );
}
