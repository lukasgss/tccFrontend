import { Button, Pill, Popover, Slider, Text, UnstyledButton } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { Gps, X } from "@phosphor-icons/react";
import { IconLocation } from "@tabler/icons-react";
import { LatLng } from "leaflet";
import { Dispatch, SetStateAction, useState } from "react";
import LocationMap from "../../../../../components/Map/LocationMap";
import useGeolocation from "../../../../../hooks/useGeoLocation";
import useMapSize from "../../../../../hooks/useScreenSize";
import { DropdownData } from "../../../../../services/Api";
import { capitalizeEveryWord, isNumber } from "../../../../../utils/strings";

export interface SelectedFilter extends DropdownData {
  id: number;
}

interface MapFilterProps {
  mapPosition: LatLng | null;
  initialRadiusDistanceInKm?: string;
  selectedFilter: SelectedFilter[];
  removeLocationFilter: (filterId: number) => void;
  setMapPosition: Dispatch<SetStateAction<LatLng | null>>;
  onConfirm: (position: LatLng | null, distanceInKm: number) => void;
}

export default function MapFilter({
  mapPosition,
  initialRadiusDistanceInKm,
  selectedFilter,
  removeLocationFilter,
  setMapPosition,
  onConfirm,
}: Readonly<MapFilterProps>) {
  const {
    state: { location },
  } = useGeolocation();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [distanceInKm, setDistanceInKm] = useState(
    initialRadiusDistanceInKm ? parseInt(initialRadiusDistanceInKm, 10) : 10,
  );
  const clickOutside = useClickOutside(() => setIsMapOpen(false));
  const sizes = useMapSize(350);
  const initialCoordinates =
    location?.latitude && location.longitude ? new LatLng(location.latitude, location.longitude) : null;

  const handleConfirm = () => {
    onConfirm(mapPosition, distanceInKm);
    setIsMapOpen(false);
  };

  return (
    <div className="mt-3.5 lg:mt-0">
      <Popover
        width={sizes.width}
        styles={{ dropdown: { padding: "0 0", height: `${sizes.height}px`, width: "100%" } }}
        opened={isMapOpen}
        position="bottom"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Button
            variant="outline"
            className="tracking-wider text-sm h-[35px] text-[var(--primary-text-color)] uppercase"
            justify="space-between"
            leftSection={<span />}
            rightSection={<IconLocation className="w-4 h-4" />}
            fullWidth
            onClick={() => setIsMapOpen((value) => !value)}
          >
            Localização
          </Button>
        </Popover.Target>
        <Popover.Dropdown ref={clickOutside}>
          <div className="p-4 pb-0 relative">
            <Text>Distância em kilômetros</Text>
            <Slider
              defaultValue={distanceInKm}
              value={distanceInKm}
              onChange={(value) => setDistanceInKm(value)}
              label={(value) => `${value} km`}
            />
            <Text size="sm">{distanceInKm} km</Text>
            <UnstyledButton onClick={() => setIsMapOpen(false)} className="absolute top-1 right-1">
              <X size={20} color="red" />
            </UnstyledButton>
          </div>
          <LocationMap
            initialCoordinates={initialCoordinates}
            mapPosition={mapPosition}
            distanceInKm={distanceInKm}
            setMapPosition={setMapPosition}
            onConfirmHandler={handleConfirm}
          />
        </Popover.Dropdown>
      </Popover>
      {selectedFilter.length > 0 &&
        selectedFilter.map((filter) => (
          <div className="flex gap-2.5" key={filter.id}>
            <Pill
              withRemoveButton
              className="bg-white text-[var(--primary-text-color)] outline outline-[1.5px] 
                outline-[var(--primary-purple)] mt-2"
              onRemove={() => removeLocationFilter(filter.id)}
            >
              <div className="flex items-center gap-1">
                <Gps size={12} className="mt-[-2px]" />
                {capitalizeEveryWord(filter.value)} {isNumber(filter.value) ? "kilômetros" : null}
              </div>
            </Pill>
          </div>
        ))}
    </div>
  );
}
