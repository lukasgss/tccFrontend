import { PetResponseNoOwner } from "../../Pets/types";
import { UserDataOnlyResponse } from "../../User/types";
import { AlertGeoLocation } from "../types";

export interface PaginatedFoundAlertResponse {
  currentPage: number;
  currentPageCount: number;
  totalPages: number;
  data: FoundAlertListingResponse[];
}

export interface FoundAnimalAlertResponse {
  id: string;
  name: string | null;
  description: string | null;
  foundLocationLatitude: number;
  foundLocationLongitude: number;
  registrationDate: string;
  recoveryDate: string | null;
  pet: PetResponseNoOwner;
  owner: UserDataOnlyResponse;
  neighborhood: string;
  city: string;
  state: string;
  geoLocation?: AlertGeoLocation;
}

export type FoundAlertListingResponse = FoundAnimalAlertResponse & {
  isFavorite: boolean;
};

export type FoundFavoriteResponse = {
  id: string;
  foundAlert: FoundAnimalAlertResponse;
};
