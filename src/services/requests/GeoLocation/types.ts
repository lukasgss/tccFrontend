export interface GeoLocationResponse {
  latitude: string;
  longitude: string;
  address: string;
  postalCode?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
}
