import { LatLng } from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { DropdownData } from "../../../../services/Api";
import { ColorResponse } from "../../../../services/requests/Pets/types";

export interface Filter {
  id: FilterType;
  text: string;
  availableValues: DropdownData[] | undefined;
  disabled: boolean;
  disabledText?: string;
  shouldBeShown: boolean;
}

export interface FilteredValues {
  id: FilterType;
  queryStringText: AdoptionQueryStringText;
  text: string;
  filteredValues: DropdownData[];
}

export interface FiltersComponentsProps {
  filters: Filter[];
  filteredValues: FilteredValues[];
  mapPosition: LatLng | null;
  isMobile: boolean;
  colors: ColorResponse[];
  handleUpdateFilters: (updatedFilters: FilteredValues[]) => void;
  handleUpdateLocationFilter: (
    latitude: DropdownData[],
    longitude: DropdownData[],
    radiusDistanceInKm: DropdownData[],
  ) => void;
  setMapPosition: Dispatch<SetStateAction<LatLng | null>>;
  handleSelectFilter: (filterApplied: FilterType, filteredValues: DropdownData[]) => void;
  clearAllFilters: () => void;
}

export enum FilterType {
  Species,
  City,
  Age,
  Size,
  Gender,
  Breed,
  Color,
  Latitude,
  Longitude,
  RadiusDistanceInKm,
}

type AdoptionQueryStringText =
  | "speciesId"
  | "city"
  | "ageIds"
  | "sizeIds"
  | "genderIds"
  | "breedIds"
  | "colorIds"
  | "latitude"
  | "longitude"
  | "radiusDistanceInKm";
