import React, { useState } from 'react';
import { queryCoordsForName } from '@/api/supabase/queries/query';
import {
  ApplyFiltersText,
  ClearFiltersText,
  PanelTitle,
  SearchInput,
} from '@/styles/texts';
import {
  Coord,
  Filters,
  FilterType,
  MultiPolygonCoords,
  PolygonCoords,
} from '@/types/schema';
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

async function getCoords(
  category: string,
  name: string,
): Promise<(PolygonCoords[] | MultiPolygonCoords)[]> {
  const coords = await queryCoordsForName(category, name);
  return coords;
}

function isMultiPolygon(
  coords: PolygonCoords[] | MultiPolygonCoords,
): coords is MultiPolygonCoords {
  return Array.isArray(coords[0]) && Array.isArray((coords[0] as Coord[])[0]);
}

function drawPolygonsFromCoords(
  mapInstance: google.maps.Map,
  coords: PolygonCoords[] | MultiPolygonCoords,
  bounds: google.maps.LatLngBounds,
): google.maps.Polygon[] {
  const polygons: google.maps.Polygon[] = [];

  // wrap single polygon in array
  const polygonSets = isMultiPolygon(coords) ? coords : [coords];

  // create path for each polygon and extend bounds
  // need to add all latLngs to path in order to allow for holes in polygons
  const path = [];
  for (const poly of polygonSets) {
    const subPath = [];
    for (const [lng, lat] of poly) {
      const latLng: google.maps.LatLngLiteral = {
        lat: Number(lat),
        lng: Number(lng),
      };
      bounds.extend(latLng);
      subPath.push(latLng);
    }
    path.push(subPath);
  }

  const polygon = new google.maps.Polygon({
    paths: path,
    strokeColor: '#0000FF',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#90D5FF',
    fillOpacity: 0.35,
  });

  if (!polygon) return [];

  polygon.setMap(mapInstance);
  polygons.push(polygon);

  return polygons;
}

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
  map,
  currentPolygons,
  setCurrentPolygons,
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
  map: google.maps.Map | null;
  currentPolygons: google.maps.Polygon[] | null;
  setCurrentPolygons: React.Dispatch<
    React.SetStateAction<google.maps.Polygon[] | null>
  >;
  appliedCategory: string | null;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const options: string[] | null = categoryOptionsMap[category] ?? null;
  const [selectedItem, setSelectedItem] = useState<string | null>(
    selectedLocationFilters[0] ?? null,
  );

  const clearButtonHandlerLocation = () => {
    clearButtonHandler('location');
    setSelectedItem(null);
  };

  function checkBoxClickHandler(option: string): void {
    setSelectedLocationFilters({ value: [option], isTemp: true });
    setSelectedItem(option);
  }

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

  filteredOptions?.sort((a, b) =>
    a.localeCompare(b, 'en-US', { numeric: true, sensitivity: 'base' }),
  );

  const applyButtonHandlerLocation = () => {
    setAppliedCategory(activeCategory);
    applyButtonHandler('location');

    if (!selectedItem || !map) return;

    if ((currentPolygons?.length ?? 0) > 0) {
      // remove all polygons from map
      currentPolygons?.forEach(poly => poly.setMap(null));
      setCurrentPolygons([]);
    }

    getCoords(category, selectedItem).then(coordsList => {
      const polygons: google.maps.Polygon[] = [];
      const bounds = new google.maps.LatLngBounds();

      for (const coords of coordsList) {
        const newPolygons = drawPolygonsFromCoords(map, coords, bounds);
        polygons.push(...newPolygons);
      }

      map.fitBounds(bounds);
      const currentZoom = map.getZoom();
      if (currentZoom !== undefined && currentZoom !== null) {
        map.setZoom(currentZoom - 1.5);
      }

      setCurrentPolygons(polygons);
    });
  };

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
          onClick={applyButtonHandlerLocation}
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
