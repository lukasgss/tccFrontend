import { createContext } from "react";
import useGeolocation, { GeoLocation } from "../hooks/useGeoLocation";
import { GeoLocationProviderProps } from "./types/geoLocationContextTypes";

export const GeoLocationContext = createContext<GeoLocation>({
  error: false,
  loading: true,
  location: null,
});

export function GeoLocationProvider({ children }: GeoLocationProviderProps) {
  const { state: geoLocation } = useGeolocation();

  return <GeoLocationContext.Provider value={geoLocation}>{children}</GeoLocationContext.Provider>;
}
