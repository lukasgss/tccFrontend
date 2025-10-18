import { ComboboxData } from "@mantine/core";
import { API, DropdownData } from "../../Api";
import { ColorResponse } from "../Pets/types";

export async function GetPetSizes(signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get("/sizes/dropdown", {
    signal,
  });
  return response.data;
}

export async function GetPetGenders(signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get("/genders/dropdown", {
    signal,
  });
  return response.data;
}

export async function GetPetGendersForFilters(signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get("/genders/filters", {
    signal,
  });
  return response.data;
}

export async function GetPetAges(signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get("/ages/dropdown", {
    signal,
  });
  return response.data;
}

export async function GetPetColors(signal: AbortSignal): Promise<ColorResponse[]> {
  const response = await API.get("/colors/dropdown", {
    signal,
  });
  return response.data;
}

export async function GetPetBreeds(speciesId: string, signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get(`/breeds/dropdown?speciesId=${speciesId}`, {
    signal,
  });
  return response.data;
}

export async function GetPetSpecies(signal: AbortSignal): Promise<DropdownData[]> {
  const response = await API.get("/species/dropdown", {
    signal,
  });
  return response.data;
}

export async function GetAllStates(signal: AbortSignal): Promise<ComboboxData> {
  const response = await API.get("/localization/states", {
    signal,
  });
  return response.data;
}

export async function GetCitiesFromState(stateId: string, signal: AbortSignal): Promise<ComboboxData> {
  const response = await API.get(`/localization/cities/${stateId}`, {
    signal,
  });
  return response.data;
}
