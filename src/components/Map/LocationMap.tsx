import { Button } from "@mantine/core";
import L, { LatLng } from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./index.css";
import MapUpdater from "./MapUpdater";

interface LocationMarkerProps {
  mapPosition: LatLng | null;
  distanceInKm: number;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
}

interface LocationMapProps {
  mapPosition: LatLng | null;
  distanceInKm: number;
  initialCoordinates: LatLng | null;
  setMapPosition: React.Dispatch<React.SetStateAction<LatLng | null>>;
  onConfirmHandler?: (lat: number, lng: number) => void;
}

const alertIcon = L.icon({
  iconRetinaUrl: iconMarker,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [20, 36],
  shadowSize: [20, 36],
});

function LocationMarker({ mapPosition, setMapPosition, distanceInKm }: Readonly<LocationMarkerProps>) {
  useMapEvents({
    click(e) {
      if (
        !String(e.originalEvent.target).toLowerCase().includes("button") &&
        !String(e.originalEvent.target).toLowerCase().includes("span")
      ) {
        const position = new LatLng(e.latlng.lat, e.latlng.lng);
        setMapPosition(position);
      }
    },
  });

  if (mapPosition === null) return null;

  return (
    <>
      <Marker position={mapPosition} icon={alertIcon}>
        <Popup>Você está aqui.</Popup>
      </Marker>
      <Circle
        center={mapPosition}
        radius={distanceInKm * 1000} // Convert km to meters
        pathOptions={{ fillColor: "blue", fillOpacity: 0.1, color: "blue" }}
      />
    </>
  );
}

export default function LocationMap({
  mapPosition,
  initialCoordinates,
  distanceInKm,
  setMapPosition,
  onConfirmHandler,
}: Readonly<LocationMapProps>) {
  const defaultBrazilianCoordinates = useMemo(() => new LatLng(-13.300210326436629, -50.70144563454823), []);
  const defaultUnknownLocationZoom = 4;
  const defaultKnownLocationZoom = 13.5;

  const [mapCenter, setMapCenter] = useState<LatLng>(defaultBrazilianCoordinates);
  const [mapZoom, setMapZoom] = useState<number>(defaultUnknownLocationZoom);

  const updateMapView = useCallback(() => {
    if (mapPosition) {
      setMapCenter(mapPosition);
      setMapZoom(defaultKnownLocationZoom);
    } else if (initialCoordinates) {
      setMapCenter(initialCoordinates);
      setMapZoom(defaultKnownLocationZoom);
      setMapPosition(initialCoordinates);
    } else {
      setMapCenter(defaultBrazilianCoordinates);
      setMapZoom(defaultUnknownLocationZoom);
    }
  }, [mapPosition, initialCoordinates, defaultBrazilianCoordinates, setMapPosition]);

  useEffect(() => {
    updateMapView();
  }, [updateMapView]);

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom
        style={{ flex: 1, width: "100%", height: "100%", zIndex: 1000 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker mapPosition={mapPosition} setMapPosition={setMapPosition} distanceInKm={distanceInKm} />
        <MapUpdater coordinates={mapCenter} zoom={mapZoom} />
        <Button
          variant="filled"
          type="button"
          className="absolute bottom-0 right-0 bg-[var(--primary-blue)] font-bold uppercase tracking-wider text-white 
            z-[5000] rounded hover:bg-[var(-primary-blue-hover)]"
          onClick={(e) => {
            e.preventDefault();
            if (onConfirmHandler != null && mapPosition?.lat && mapPosition?.lng) {
              onConfirmHandler(mapPosition.lat, mapPosition.lng);
            }
          }}
        >
          Confirmar
        </Button>
      </MapContainer>
    </>
  );
}
