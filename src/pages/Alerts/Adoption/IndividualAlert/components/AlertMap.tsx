import { Text, Title } from "@mantine/core";
import { SmileyMeh } from "@phosphor-icons/react";
import L, { LatLngExpression } from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useContext } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import personMarkerIconUrl from "../../../../../assets/icons/person-marker.webp";
import { GeoLocationContext } from "../../../../../contexts/GeoLocationContext";

const alertIcon = L.icon({
  iconRetinaUrl: iconMarker,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

interface AlertMapProps {
  alertCoordinates: LatLngExpression | null;
}

export default function AlertMap({ alertCoordinates }: Readonly<AlertMapProps>) {
  const userLocation = useContext(GeoLocationContext);

  const personIcon = new L.Icon({
    iconUrl: personMarkerIconUrl,
    iconSize: new L.Point(40, 40),
  });

  if (!alertCoordinates) {
    return (
      <div className="h-[200px] border-2 border-gray-300 py-5 rounded-md w-full flex flex-col items-center justify-center max-w-3xl mx-auto mt-5">
        <Title order={4}>Me desculpe!</Title>
        <SmileyMeh className="w-56 h-56" />
        <Text className="p-4 text-center text-md md:text-lg">
          Infelizmente não conseguimos encontrar a localização baseada no bairro inserido
        </Text>
      </div>
    );
  }

  return (
    <div className="h-[450px] w-full max-w-3xl mx-auto">
      <MapContainer
        center={alertCoordinates}
        zoom={14.5}
        scrollWheelZoom
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {alertCoordinates !== null ? (
          <Marker position={alertCoordinates} alt="Marcador do animal" icon={alertIcon}>
            <Popup>O animal está aqui</Popup>
          </Marker>
        ) : null}

        {userLocation.location && (
          <Marker position={[userLocation.location?.latitude, userLocation.location?.longitude]} icon={personIcon}>
            <Popup>Você está aproximadamente aqui</Popup>{" "}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
