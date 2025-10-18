import { useEffect, useState } from "react";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type GeoLocation = {
  loading: boolean;
  error: boolean;
  location: Coordinate | null;
};

export default function useGeolocation(active: boolean = true) {
  const [state, setState] = useState<GeoLocation>({
    location: null,
    loading: true,
    error: false,
  });

  function getLocation() {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: true,
        location: null,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          loading: false,
          error: false,
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => {
        setState({
          loading: false,
          error: true,
          location: null,
        });
      },
    );
  }

  useEffect(() => {
    if (!active) {
      return;
    }

    getLocation();
  }, []);

  return { state, getLocation };
}
