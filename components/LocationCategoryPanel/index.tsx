import React, { useState } from 'react';
import {
  ApplyFiltersText,
  ClearFiltersText,
  PanelTitle,
  SearchInput,
} from '@/styles/texts';
import { Filters, FilterType } from '@/types/schema';
import {
  BackArrowIcon,
  SearchIcon,
  UpArrowIcon,
} from '../../assets/Location-Category-Icons/icons';
import LocationCategoryOption from '../LocationCategoryOption';
import {
  ApplyButtonStyles,
  ApplyClearButtonContainer,
  BackArrowIconButton,
  BackArrowWithTitleContainer,
  CategoryInnerContainer,
  ClearButtonStyles,
  CloseIconButton,
  ItemContainer,
  PanelContainer,
  PanelHeader,
  SearchBar,
  SearchIconWithTextContainer,
  Underline,
} from './styles';

// interface LocationOption {
//   name: string;
//   coordinates: string;
// }

export default function LocationCategoryPanel({
  onBack,
  category,
  handleButtonClick,
  currFilter,
  selectedLocationFilters,
  clearButtonHandler,
  setSelectedLocationFilters,
  categoryOptionsMap,
  activeCategory,
  setAppliedCategory,
  applyButtonHandler,
  // map,
  // currentPolygon,
  // setCurrentPolygon,
  appliedCategory,
}: {
  onBack: () => void;
  category: string;
  handleButtonClick: (filter: FilterType) => void;
  currFilter: FilterType;
  selectedLocationFilters: string[];
  clearButtonHandler: (filter: keyof Filters) => void;
  setSelectedLocationFilters: (args: {
    value: string[];
    isTemp: boolean;
  }) => void;
  categoryOptionsMap: Record<string, string[]>;
  activeCategory: string | null;
  setAppliedCategory: React.Dispatch<React.SetStateAction<string | null>>;
  applyButtonHandler: (filter: keyof Filters) => void;
  // map: google.maps.Map | null;
  // currentPolygon: google.maps.Polygon | null;
  // setCurrentPolygon: React.Dispatch<
  //   React.SetStateAction<google.maps.Polygon | null>
  // >;
  appliedCategory: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  console.log('categoryOptionsMap: ', categoryOptionsMap);
  const options: string[] | null = categoryOptionsMap[category] ?? null;

  // const uniqueOptions = options
  //   ? Array.from(new Set(options.map(item => item.trim()))).sort((a, b) =>
  //       a.localeCompare(b, 'en-US', { numeric: true, sensitivity: 'base' }),
  //     )
  //   : [];

  // const filteredOptions = uniqueOptions?.filter(item =>
  //   item.toLowerCase().includes(searchTerm.toLowerCase()),
  // const options: LocationOption[] | null = categoryOptionsMap[category] ?? null;
  // const [selectedItem, setSelectedItem] = useState<LocationOption | null>(
  //   options?.find(option => option.name === selectedLocationFilters[0]) ?? null,
  // );
  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedLocationFilters[0] ?? null,
  );

  const seen = new Set();
  const filteredOptions = options?.filter(option => {
    const name = option.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    if (matchesSearch && !seen.has(name)) {
      seen.add(name);
      return true;
    }
    return false;
  });

  // sort filteredOptions alphabetically
  filteredOptions?.sort((a, b) =>
    a.localeCompare(b, 'en-US', { numeric: true, sensitivity: 'base' }),
  );

  console.log('filteredOptions: ', filteredOptions);

  const applyButtonHandlerLocation = () => {
    setAppliedCategory(activeCategory);
    applyButtonHandler('location');
    // if (selectedItem && map) {
    //   drawPolygonFromSelectedItemAndZoom(selectedItem, map);
    // }
  };

  const clearButtonHandlerLocation = () => {
    clearButtonHandler('location');
    setSelectedItem(null);
  };

  function checkBoxClickHandler(option: string): void {
    setSelectedLocationFilters({ value: [option], isTemp: true });
    setSelectedItem(option);
  }

  // function drawPolygonFromSelectedItemAndZoom(
  //   selectedItem: string | null,
  //   mapInstance: google.maps.Map | null,
  // ): google.maps.Polygon | null {
  //   const bounds = new google.maps.LatLngBounds();
  //   if (!selectedItem) {
  //     console.error('No selected item to draw.');
  //     return null;
  //   }

  //   if (!mapInstance) {
  //     console.error('No selected map.');
  //     return null;
  //   }

  //   try {
  //     const coordsArray = JSON.parse(selectedItem.coordinates);
  //     // const center = getPolygonCenter(coordsArray);
  //     // mapInstance?.setCenter(center);
  //     // mapInstance?.setZoom(7);

  //     const points = coordsArray[0];

  //     for (const [lng, lat] of points) {
  //       bounds.extend({ lat, lng });
  //     }

  //     mapInstance?.fitBounds(bounds);
  //     const currentZoom = mapInstance?.getZoom();
  //     if (currentZoom !== undefined && currentZoom !== null) {
  //       mapInstance?.setZoom(currentZoom - 1.5);
  //     }

  //     if (!Array.isArray(coordsArray) || !Array.isArray(coordsArray[0])) {
  //       console.error('Invalid coordinates format.');
  //       return null;
  //     }

  //     const path = coordsArray[0].map(([lng, lat]: [number, number]) => ({
  //       lat,
  //       lng,
  //     }));

  //     const polygon = new google.maps.Polygon({
  //       paths: path,
  //       strokeColor: '#0000FF',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 3,
  //       fillColor: '#90D5FF',
  //       fillOpacity: 0.35,
  //     });
  //     if (currentPolygon) {
  //       currentPolygon.setMap(null);
  //     }
  //     if (polygon) {
  //       setCurrentPolygon(polygon);
  //     }
  //     polygon.setMap(mapInstance);

  //     return polygon;
  //   } catch (error) {
  //     console.error('Error parsing coordinates:', error);
  //     return null;
  //   }
  // }

  return (
    <PanelContainer>
      <CategoryInnerContainer>
        <PanelHeader>
          <BackArrowWithTitleContainer>
            <BackArrowIconButton onClick={onBack}>
              <BackArrowIcon />
            </BackArrowIconButton>
            <PanelTitle>{category}</PanelTitle>
          </BackArrowWithTitleContainer>
          <CloseIconButton onClick={() => handleButtonClick(currFilter)}>
            <UpArrowIcon />
          </CloseIconButton>
        </PanelHeader>
        <SearchBar>
          <SearchIconWithTextContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search"
              onChange={e => setSearchTerm(e.target.value)}
            />
          </SearchIconWithTextContainer>
          <Underline />
        </SearchBar>
        <ItemContainer>
          {filteredOptions?.map(option => (
            <LocationCategoryOption
              key={option}
              label={option}
              selected={selectedItem === option}
              onClick={() => checkBoxClickHandler(option)}
            />
          ))}
        </ItemContainer>
      </CategoryInnerContainer>

      <ApplyClearButtonContainer>
        <ApplyButtonStyles
          $isActive={
            selectedItem !== null || appliedCategory === activeCategory
          }
          onClick={() => {
            if (selectedItem) {
              applyButtonHandlerLocation();
            }
          }}
        >
          <ApplyFiltersText>APPLY</ApplyFiltersText>
        </ApplyButtonStyles>
        <ClearButtonStyles
          $isActive={selectedItem !== null}
          onClick={clearButtonHandlerLocation}
        >
          <ClearFiltersText>CLEAR</ClearFiltersText>
        </ClearButtonStyles>
      </ApplyClearButtonContainer>
    </PanelContainer>
  );
}
