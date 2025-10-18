import { Button, Drawer, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FunnelSimple } from "@phosphor-icons/react";
import { LatLng } from "leaflet";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DropdownData } from "../../../../../services/Api";
import ButtonMultiSelect from "../ButtonMultiSelect";
import { FiltersComponentsProps, FilterType } from "../types";
import MapFilter, { SelectedFilter } from "./MapFilter";

interface LocationData {
  type: FilterType;
  values: DropdownData[];
}

interface LocationFilters {
  latitude: LocationData;
  longitude: LocationData;
  radiusDistanceInKm: LocationData;
}

export default function AlertFilters({
  filters,
  filteredValues,
  mapPosition,
  isMobile,
  colors,
  handleUpdateFilters,
  handleUpdateLocationFilter,
  setMapPosition,
  handleSelectFilter,
  clearAllFilters,
}: Readonly<FiltersComponentsProps>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedLocationFilters, setSelectedLocationFilters] = useState<SelectedFilter[]>([]);

  const handleClearFilters = () => {
    clearAllFilters();
    setSearchParams({});
  };

  const updateLocationQueryString = (locationFilters: LocationFilters) => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.values(locationFilters).forEach((filter: LocationData) => {
      const queryStringText = filteredValues.find((f) => f.id === filter.type)?.queryStringText;
      if (!queryStringText) {
        return;
      }
      newSearchParams.delete(queryStringText);

      filter.values.forEach((value) => {
        newSearchParams.append(queryStringText, value.value);
      });
    });

    setSearchParams(newSearchParams);
  };

  const updateQueryString = (filterCategory: FilterType, selectedValues: DropdownData[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const queryStringText = filteredValues.find((f) => f.id === filterCategory)?.queryStringText;
    if (!queryStringText) {
      return;
    }
    if (selectedValues.length > 0) {
      newSearchParams.delete(queryStringText);
      selectedValues.forEach((value) => {
        newSearchParams.append(queryStringText, value.value);
      });
    } else {
      newSearchParams.delete(queryStringText);
    }
    setSearchParams(newSearchParams);
  };

  const handleLocationFilter = (position: LatLng | null, radiusDistanceInKm: number) => {
    if (!position) {
      return;
    }

    const locationFilters = {
      [FilterType.Latitude]: position.lat.toString(),
      [FilterType.Longitude]: position.lng.toString(),
      [FilterType.RadiusDistanceInKm]: radiusDistanceInKm.toString(),
    };

    const latitudeFilter = [{ label: "Latitude", value: locationFilters[FilterType.Latitude] }];
    const longitudeFilter = [{ label: "Longitude", value: locationFilters[FilterType.Longitude] }];
    const radiusDistanceInKmFilter = [
      { label: "Distância em km", value: locationFilters[FilterType.RadiusDistanceInKm] },
    ];
    handleUpdateLocationFilter(latitudeFilter, longitudeFilter, radiusDistanceInKmFilter);

    updateLocationQueryString({
      latitude: {
        type: FilterType.Latitude,
        values: latitudeFilter,
      },
      longitude: {
        type: FilterType.Longitude,
        values: longitudeFilter,
      },
      radiusDistanceInKm: {
        type: FilterType.RadiusDistanceInKm,
        values: radiusDistanceInKmFilter,
      },
    });
  };

  useEffect(() => {
    const initializeFilters = () => {
      const updatedFilters = [...filteredValues];
      let newMapPosition: LatLng | null = null;

      const handleNonLocationFilters = () => {
        filters.forEach((filter) => {
          const queryStringText = filteredValues.find((f) => f.id === filter.id)?.queryStringText;
          if (!queryStringText) {
            return;
          }

          const queryValues = searchParams.getAll(queryStringText);
          const initialSelectedFilters =
            filter.availableValues?.filter((item) => queryValues.includes(item.value)) || [];
          if (initialSelectedFilters.length <= 0) {
            return;
          }

          const filterIndex = updatedFilters.findIndex((f) => f.id === filter.id);
          if (filterIndex !== -1) {
            updatedFilters[filterIndex] = { ...updatedFilters[filterIndex], filteredValues: initialSelectedFilters };
          }
        });
      };
      const handleLocationFilters = () => {
        const latitudeFilter = filteredValues.find((f) => f.id === FilterType.Latitude);
        const longitudeFilter = filteredValues.find((f) => f.id === FilterType.Longitude);
        const radiusDistanceInKmFilter = filteredValues.find((f) => f.id === FilterType.RadiusDistanceInKm);

        if (
          !latitudeFilter?.queryStringText &&
          !longitudeFilter?.queryStringText &&
          !radiusDistanceInKmFilter?.queryStringText
        ) {
          return;
        }

        const latitude = searchParams.get(latitudeFilter!.queryStringText);
        const longitude = searchParams.get(longitudeFilter!.queryStringText);
        const radiusDistanceInKm = searchParams.get(radiusDistanceInKmFilter!.queryStringText);

        if (!latitude && !longitude && !radiusDistanceInKm) {
          return;
        }

        const latIndex = updatedFilters.findIndex((f) => f.id === FilterType.Latitude);
        const lngIndex = updatedFilters.findIndex((f) => f.id === FilterType.Longitude);
        const radiusIndex = updatedFilters.findIndex((f) => f.id === FilterType.RadiusDistanceInKm);

        if (latIndex === -1 || lngIndex === -1 || radiusIndex === -1) {
          return;
        }

        updatedFilters[latIndex] = {
          ...updatedFilters[latIndex],
          filteredValues: [{ label: "Latitude", value: latitude! }],
        };
        updatedFilters[lngIndex] = {
          ...updatedFilters[lngIndex],
          filteredValues: [{ label: "Longitude", value: longitude! }],
        };
        updatedFilters[radiusIndex] = {
          ...updatedFilters[radiusIndex],
          filteredValues: [{ label: "Distância em km", value: radiusDistanceInKm! }],
        };

        newMapPosition = new LatLng(parseFloat(latitude!), parseFloat(longitude!));
      };

      handleNonLocationFilters();
      handleLocationFilters();

      handleUpdateFilters(updatedFilters);

      if (newMapPosition) {
        setMapPosition(newMapPosition);
      }
    };

    initializeFilters();
  }, [filters]);

  const filteredRadiusDistanceInKm = filteredValues.find((t) => t.id === FilterType.RadiusDistanceInKm);

  const clearLocationFilters = (filterId: number) => {
    const filterToRemove = selectedLocationFilters.find((f) => f.id === filterId);

    if (filterToRemove?.label === "Distância em km") {
      const updatedFilters = filteredValues.map((filter) =>
        filter.id !== FilterType.Latitude &&
        filter.id !== FilterType.Longitude &&
        filter.id !== FilterType.RadiusDistanceInKm
          ? filter
          : { ...filter, filteredValues: [] },
      );
      handleUpdateFilters(updatedFilters);
      updateLocationQueryString({
        latitude: { type: FilterType.Latitude, values: [] },
        longitude: { type: FilterType.Longitude, values: [] },
        radiusDistanceInKm: { type: FilterType.RadiusDistanceInKm, values: [] },
      });
    } else {
      const updatedCityFilters = filteredValues.map((filter) =>
        filter.id !== FilterType.City
          ? filter
          : { ...filter, filteredValues: filter.filteredValues.filter((f) => f.label !== filterToRemove?.label) },
      );
      handleUpdateFilters(updatedCityFilters);
      updateQueryString(
        FilterType.City,
        updatedCityFilters.find((f) => f.id === FilterType.City)?.filteredValues ?? [],
      );
    }
  };

  const isSpeciesSelected = (filteredValues.find((f) => f.id === FilterType.Species)?.filteredValues ?? []).length > 0;

  const filtersSearch = {
    [FilterType.Color]: {
      placeholder: "Buscar por cor",
    },
    [FilterType.Breed]: {
      placeholder: "Buscar por raça",
    },
  };

  const getSelectedLocationFilters = () => {
    const locationFilters = filteredValues.find((f) => f.id === FilterType.RadiusDistanceInKm)?.filteredValues ?? [];
    const cityFilters = filteredValues.find((f) => f.id === FilterType.City)?.filteredValues ?? [];

    let uniqueId = 1;
    const locationFiltersWithId = locationFilters.map((filter) => ({ ...filter, id: uniqueId++ }));
    const cityFiltersWithId = cityFilters.map((filter) => ({ ...filter, id: uniqueId++ }));

    setSelectedLocationFilters([...locationFiltersWithId, ...cityFiltersWithId]);
  };

  const renderFilters = () => (
    <>
      <div>
        {!isMobile && (
          <div className="flex items-center justify-start gap-3">
            <FunnelSimple size={32} className="text-[var(--light-text-color)] mr-1" />
            <Title order={2}>Filtros</Title>
          </div>
        )}
        <Button
          type="button"
          variant="light"
          className="w-full mt-3 uppercase tracking-wider"
          onClick={handleClearFilters}
        >
          Limpar filtros
        </Button>
      </div>
      <div className="flex flex-col gap-3.5">
        <MapFilter
          mapPosition={mapPosition}
          initialRadiusDistanceInKm={filteredRadiusDistanceInKm?.filteredValues[0]?.value}
          selectedFilter={selectedLocationFilters}
          removeLocationFilter={clearLocationFilters}
          setMapPosition={setMapPosition}
          onConfirm={handleLocationFilter}
        />
        {filters.map(
          (filter) =>
            filter.shouldBeShown && (
              <ButtonMultiSelect
                key={filter.id}
                data={filter.availableValues ?? []}
                selectedFilters={filteredValues.find((f) => f.text === filter.text)?.filteredValues ?? []}
                filterCategory={filter.id}
                placeholder={filter.text}
                handleSelectFilter={(filterCategory, selectedValues) => {
                  handleSelectFilter(filterCategory, selectedValues);
                  updateQueryString(filterCategory, selectedValues);
                }}
                disabled={filter.disabled}
                disabledText={filter.disabledText}
                queryStringText={filteredValues.find((f) => f.id === filter.id)?.queryStringText}
                searchParams={searchParams}
                colors={colors ?? []}
                isSpeciesSelected={isSpeciesSelected}
                searchPlaceholder={filtersSearch[filter.id as keyof typeof filtersSearch]?.placeholder}
              />
            ),
        )}
      </div>
    </>
  );

  useEffect(() => {
    getSelectedLocationFilters();
  }, [filteredValues]);

  if (isMobile) {
    return (
      <>
        <div className="flex items-center justify-start gap-3">
          <Button
            variant="outline"
            className="px-2 bg-white border-2 max-[360px]:w-full"
            onClick={open}
            aria-label="Filtros"
          >
            <div className="flex items-center gap-1.5">
              <FunnelSimple size={28} className="text-[var(--light-text-color)]" />
              <Text fw={700} className="text-[var(--light-text-color)] text-sm ">
                Filtros
              </Text>
            </div>
          </Button>
        </div>
        <Drawer
          opened={opened}
          onClose={close}
          size="xs"
          title={
            <div className="flex items-center justify-start gap-3">
              <FunnelSimple size={32} className="text-[var(--light-text-color)] mr-1" />
              <Title order={2}>Filtros</Title>
            </div>
          }
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          zIndex={10}
        >
          {renderFilters()}
          <div className="flex justify-center mt-4">
            <Button variant="filled" className="uppercase tracking-wider" onClick={close}>
              Aplicar filtros
            </Button>
          </div>
        </Drawer>
      </>
    );
  }

  return (
    <div className="relative">
      <div
        className="sticky flex flex-col gap-3.5 bg-white text-[var(--primary-blue)] mt-6 mx-8 top-[75px] 
        rounded-md px-5 pt-2 pb-8 w-80 h-fit border-2 border-zinc-300"
      >
        {renderFilters()}
      </div>
    </div>
  );
}
