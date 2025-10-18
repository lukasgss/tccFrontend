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
