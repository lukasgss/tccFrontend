import { AlertTypes } from "../../../pages/Home/components/AlertCard";
import { OwnerResponse } from "../User/types";

export interface Pet {
  id: string;
  name: string;
  observations: string | null;
  gender: Gender | null;
  age: string;
  size: string;
  images: string[];
  colors: Color[];
  breed: Breed;
  isCastrated: boolean | undefined;
  isVaccinated: boolean | undefined;
  isNegativeToFivFelv: boolean | undefined;
  isNegativeToLeishmaniasis: boolean | undefined;
}

export interface Gender {
  id: number;
  name: "Macho" | "Fêmea";
}

export enum GenderEnum {
  Male = 1,
  Female = 2,
}

export interface Age {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface PetResponse {
  id: string;
  name: string;
  gender: Gender | null;
  age: Age;
  images: string[];
  owner: OwnerResponse;
  size: Size;
  colors: ColorResponse[];
  breed: BreedResponse;
}

export interface PetResponseNoOwner {
  id: string;
  name: string;
  gender: Gender | null;
  age: Age | null;
  size: Size | null;
  images: string[];
  colors: ColorResponse[];
  species: SpeciesResponse;
  breed: BreedResponse | null;
  isCastrated: boolean | undefined;
  isVaccinated: boolean | undefined;
  isNegativeToFivFelv: boolean | undefined;
  isNegativeToLeishmaniasis: boolean | undefined;
}

export interface SimplifiedPetResponse {
  id: string;
  name: string;
  observations?: string;
  gender: Gender | null;
  age: string;
  size: string;
  images: string[];
}

export interface ColorResponse {
  id: number;
  name: string;
  hexCode: string;
}

export interface BreedResponse {
  id: number;
  name: string;
}

export interface SpeciesResponse {
  id: string;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  hexCode: string;
}

export interface Breed {
  id: number;
  name: string;
}

export interface Owner {
  id: string;
  email: string;
  image: string;
  fullName: string;
  phoneNumber: string;
}

export interface RecentlyViewedPet {
  type: AlertTypes;
  id: string;
  name: string;
  images: string[];
  gender: Gender | null;
  breed: BreedResponse | null;
  ownerId: string;
}
