import { Age, BreedResponse, ColorResponse, Gender, PetResponseNoOwner, Size, SpeciesResponse } from "../Pets/types";

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  onlyWhatsAppMessages: boolean;
};

export type UserDataResponse = {
  id: string;
  email: string;
  fullName: string;
  image: string;
  phoneNumber: string;
  onlyWhatsAppMessages: boolean;
  accessToken: string;
  refreshToken: string;
};

export type AdoptionAlertProfile = {
  id: string;
  locationLatitude?: number;
  locationLongitude?: number;
  description: string | null;
  adoptionRestrictions: string[];
  registrationDate: Date;
  adoptionDate: string;
  isFavorite: boolean;
  pet: PetResponseNoOwner;
  owner: UserDataOnlyResponse;
};

export type UserProfileResponse = {
  adoptionAlerts: AdoptionAlertProfile[];
} & UserData;

export type UserDataOnlyResponse = {
  id: string;
  fullName: string;
  image: string;
  phoneNumber: string;
  onlyWhatsAppMessages: boolean;
};

export type UserData = {
  id: string;
  image: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  onlyWhatsAppMessages: boolean;
};

export interface OwnerResponse {
  fullName: string;
  email: string;
  image: string;
  phoneNumber: string;
}

export interface UpdateUserPassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserPreferencesResponse {
  genders: Gender[];
  ages: Age[];
  sizes: Size[];
  colors: ColorResponse[];
  species: SpeciesResponse[];
  breeds: BreedResponse[];
  user: UserDataOnlyResponse;
}

export interface CreateUserPreferencesRequest {
  genders?: number[];
  ages?: number[];
  sizes?: number[];
  colorIds?: number[];
  speciesIds?: number[];
  breedIds?: number[];
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type ExternalAuthenticationData = {
  provider: "GOOGLE" | "FACEBOOK";
  idToken: string;
};

export interface CreatedAlertsResponse {
  adoptionAlerts: AdoptionAlert[];
  foundAnimalAlerts: FoundAnimalAlert[];
}

interface AdoptionAlert {
  id: string;
  description: string;
  registrationDate: string;
  adoptionDate: string | null;
  adoptionRestrictions: string[];
  pet: Pet;
  city: string | null;
  owner: Owner;
  isFavorite: boolean;
}

interface FoundAnimalAlert {
  id: string;
  name: string;
  description: string | null;
  foundLocationLatitude: number;
  foundLocationLongitude: number;
  registrationDate: string;
  recoveryDate: string | null;
  pet: Pet;
  owner: Owner;
}

interface Pet {
  id: string;
  name: string;
  age: IdName;
  breed: IdName;
  gender: IdName;
  images: string[];
}

interface IdName {
  id: number;
  name: string;
}

interface Owner {
  id: string;
  image: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  onlyWhatsAppMessages: boolean;
  defaultAdoptionFormUrl: string | null;
}
