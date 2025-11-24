import { PetResponseNoOwner } from "../Pets/types";
import { UserDataOnlyResponse } from "../User/types";

export interface LocationResponse {
  value: number;
  text: string;
}

export interface AlertGeoLocation {
  address: string;
  city: LocationResponse;
  neighborhood: string;
  state: LocationResponse;
  postalCode: string;
}

export interface PaginatedMissingAlertResponse {
  currentPage: number;
  currentPageCount: number;
  totalPages: number;
  data: MissingAlertListingResponse[];
}

export type MissingAlertListingResponse = MissingAnimalAlertResponse & {
  isFavorite: boolean;
};

export interface MissingAnimalAlertResponse {
  id: string;
  description: string | null;
  lastSeenLocationLatitude: number;
  lastSeenLocationLongitude: number;
  registrationDate: Date;
  recoveryDate: string | null;
  pet: PetResponseNoOwner;
  owner: UserDataOnlyResponse;
  neighborhood: string;
  city: string;
  state: string;
  geoLocation?: AlertGeoLocation;
}

export interface MissingAlertResponseWithGeoLocation {
  id: string;
  registrationDate: string;
  description: string | null;
  recoveryDate: string | null;
  pet: PetResponseNoOwner;
  owner: UserDataOnlyResponse;
  geoLocation: AlertGeoLocation;
  isFavorite?: boolean;
  lastSeenLocationLatitude?: number;
  lastSeenLocationLongitude?: number;
  neighborhood?: string;
}

export interface GenderResponse {
  id: number;
  name: string;
}

export interface AgeResponse {
  id: number;
  name: string;
}

export interface SizeResponse {
  id: number;
  name: string;
}

export interface ColorResponse {
  id: number;
  name: string;
}

export interface BreedResponse {
  id: number;
  name: string;
}

export interface SpeciesResponse {
  id: number;
  name: string;
}

export interface OwnerResponse {
  id: string;
  fullName: string;
  email: string;
  image: string;
  phoneNumber: string;
  onlyWhatsAppMessages?: boolean;
}
