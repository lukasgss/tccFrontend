import { API } from "../../Api";
import { GeoLocationResponse } from "./types";

export const GetGeoLocationDataFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<GeoLocationResponse> => {
  const response = await API.get(`geo-location/address/coordinates?latitude=${latitude}&longitude=${longitude}`);
  return response.data;
};

export const GetGeoLocationDataFromAddress = async (address: string): Promise<GeoLocationResponse> => {
  const response = await API.get(`geo-location/coordinates/address?address=${address}`);
  return response.data;
};

export const ValidateInsertedAddress = async (neighborhood: string, stateId: string, cityId: string) => {
  const response = await API.get(
    `geo-location/alerts/location-validation?neighborhood=${neighborhood}&stateId=${stateId}&cityId=${cityId}`,
  );
  return response.data;
};
