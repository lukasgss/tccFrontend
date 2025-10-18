import { Owner, Pet, PetResponseNoOwner, SimplifiedPetResponse } from "../../Pets/types";
import { UserDataOnlyResponse } from "../../User/types";
import { AlertGeoLocation } from "../types";

export interface SuggestedAlert {
  id: string;
  onlyForScreenedProperties: boolean;
  locationLatitude: number;
  locationLongitude: number;
  description: string;
  registrationDate: string;
  adoptionDate: Date | null;
  pet: Pet;
  owner: Owner;
}

export interface PaginatedAdoptionAlertResponse {
  currentPage: number;
  currentPageCount: number;
  totalPages: number;
  data: AdoptionAlertListingResponse[];
}

export interface AdoptionForm {
  fileUrl: string;
  fileName: string;
}

export interface AdoptionAlertResponse {
  id: string;
  stateId: number;
  cityId: number;
  neighborhood: string;
  locationLatitude?: number;
  locationLongitude?: number;
  description: string | null;
  adoptionRestrictions: string[];
  registrationDate: Date;
  adoptionDate: string;
  isFavorite: boolean;
  pet: PetResponseNoOwner;
  owner: UserDataOnlyResponse;
  geoLocation?: AlertGeoLocation;
  adoptionForm?: AdoptionForm;
}

export type AdoptionAlertListingResponse = AdoptionAlertResponse & {
  isFavorite: boolean;
};

export interface SimplifiedAdoptionAlertResponse {
  id: string;
  locationLatitude: number;
  locationLongitude: number;
  description?: string;
  registrationDate: Date;
  adoptionDate: Date;
  pet: SimplifiedPetResponse;
}

export interface ToggleAdoptionAlertFavoriteResponse {
  guid: string;
  adoptionAlert: SimplifiedAdoptionAlertResponse;
}

export interface CreateAdoptionAlertRequest {
  adoptionRestrictions: string[];
  address: string;
  state: string;
  city: string;
  description: string;
  restrictions: string[];
  petId: string;
}
