import { LatLng } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapUpdaterProps {
  coordinates: LatLng;
  zoom: number;
}

export default function MapUpdater({ coordinates, zoom }: Readonly<MapUpdaterProps>) {
  const map = useMap();

  useEffect(() => {
    map.setView(coordinates, zoom);
  }, [map, coordinates, zoom]);

  return null;
}
