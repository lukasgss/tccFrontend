import { em, Loader } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LatLng } from "leaflet";
import { useCallback, useEffect, useState } from "react";
import ConversationsSidebar from "../../../../components/Chat/components/ConversationSidebar";
import DefaultError from "../../../../components/Common/Errors/DefaultError";
import NoData from "../../../../components/Common/NoData/NoData";
import FiltersSkeleton from "../../../../components/Common/Skeletons/AdoptionListingsSkeleton";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import useAgesQuery from "../../../../queries/useAgesQuery";
import useBreedsQuery from "../../../../queries/useBreedsQuery";
import useColorsQuery from "../../../../queries/useColorsQuery";
import useGendersQuery from "../../../../queries/useGendersQuery";
import useSizesQuery from "../../../../queries/useSizesQuery";
import useSpeciesQuery from "../../../../queries/useSpeciesQuery";
import { DropdownData } from "../../../../services/Api";
import { Filter, FilteredValues, FilterType } from "../../Adoption/AdoptionListings/types";
import AlertFilters from "../../Adoption/AdoptionListings/components/AlertFilters";
import CreateFoundAlertButton from "./CreateFoundAlertButton";
import FoundAnimalListingHeading from "./FoundHeading";
import usePaginatedFoundAlertsQuery from "../../../../queries/usePaginatedFoundAlertsQuery";
import AlertCard from "../../../../components/Common/Alerts/AlertCard/AlertCard";

export default function FoundAnimalListings() {
  const isMobile = useMediaQuery(`(max-width: ${em(1023)})`);
  const showOutsideNewAlertBtn = useMediaQuery(`(max-width: ${em(767)})`);
  const [disableBreeds, setDisableBreeds] = useState(true);
  const [filteredSpeciesId, setFilteredSpeciesId] = useState("");
  const [filtersQueryString, setFiltersQueryString] = useState("");

  const [mapPosition, setMapPosition] = useState<LatLng | null>(null);

  const pageSize = 20;

  const { data: species } = useSpeciesQuery();
  const { data: breeds, refetch: refetchBreeds } = useBreedsQuery(filteredSpeciesId);
  const { data: genders } = useGendersQuery(true);
  const { data: sizes } = useSizesQuery();
  const { data: ages } = useAgesQuery();
  const { data: colors } = useColorsQuery();

  const [filteredValues, setFilteredValues] = useState<FilteredValues[]>([
    {
      id: FilterType.Species,
      queryStringText: "speciesId",
      text: "Espécie",
      filteredValues: [],
    },
    {
      id: FilterType.Age,
      queryStringText: "ageIds",
      text: "Idade",
      filteredValues: [],
    },
    {
      id: FilterType.Size,
      queryStringText: "sizeIds",
      text: "Porte",
      filteredValues: [],
    },
    {
      id: FilterType.Gender,
      queryStringText: "genderIds",
      text: "Sexo",
      filteredValues: [],
    },
    {
      id: FilterType.Breed,
      queryStringText: "breedIds",
      text: "Raça",
      filteredValues: [],
    },
    {
      id: FilterType.Color,
      queryStringText: "colorIds",
      text: "Cor",
      filteredValues: [],
    },
    {
      id: FilterType.Latitude,
      queryStringText: "latitude",
      text: "Latitude",
      filteredValues: [],
    },
    {
      id: FilterType.Longitude,
      queryStringText: "longitude",
      text: "Longitude",
      filteredValues: [],
    },
    {
      id: FilterType.RadiusDistanceInKm,
      queryStringText: "radiusDistanceInKm",
      text: "Distância em km",
      filteredValues: [],
    },
  ]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const { paginatedAlerts, isError, isLoading, isFetchingNextPage, foundAlerts, setQueryData } =
    usePaginatedFoundAlertsQuery(pageSize, filtersQueryString);

  const buildQueryString = (filtersToBuildFrom: FilteredValues[]) => {
    let queryString = "";

    filtersToBuildFrom.forEach((item) => {
      if (item.filteredValues.length > 0) {
        const valuesArray = item.filteredValues.flatMap((val) => val.value);

        valuesArray.forEach((filteredValue) => {
          queryString += `&${encodeURIComponent(item.queryStringText)}=${filteredValue}`;
        });
      }
    });

    return queryString;
  };

  const clearAllFilters = () => {
    const clearedFilters = filteredValues.map((filter) => ({ ...filter, filteredValues: [] }));
    setFilteredValues(clearedFilters);
    setDisableBreeds(true);

    setFiltersQueryString(buildQueryString([]));
    window.scrollTo(0, 0);
  };

  const handleSelectFilter = (filterApplied: FilterType, filteredVals: DropdownData[]) => {
    let updatedFilters = [...filteredValues];

    updatedFilters = updatedFilters.map((filter) =>
      filter.id === filterApplied ? { ...filter, filteredValues: filteredVals } : filter,
    );
    setFilteredValues(updatedFilters);

    if (filterApplied === FilterType.Species && filteredVals.length > 0) {
      setFilteredSpeciesId(filteredVals[0].value);
      setDisableBreeds(false);
      refetchBreeds();
    } else if (filterApplied === FilterType.Species && filteredVals.length === 0) {
      setDisableBreeds(true);
    }

    setFiltersQueryString(buildQueryString(updatedFilters));
    window.scrollTo(0, 0);
  };

  const handleLocationFilter = (
    latitude: DropdownData[],
    longitude: DropdownData[],
    radiusDistanceInKm: DropdownData[],
  ) => {
    let updatedFilters = [...filteredValues];

    updatedFilters = updatedFilters.map((filter) =>
      filter.id === FilterType.Latitude ? { ...filter, filteredValues: latitude } : filter,
    );

    updatedFilters = updatedFilters.map((filter) =>
      filter.id === FilterType.Longitude ? { ...filter, filteredValues: longitude } : filter,
    );

    updatedFilters = updatedFilters.map((filter) =>
      filter.id === FilterType.RadiusDistanceInKm ? { ...filter, filteredValues: radiusDistanceInKm } : filter,
    );

    setFilteredValues(updatedFilters);
    setFiltersQueryString(buildQueryString(updatedFilters));
    window.scrollTo(0, 0);
  };

  const setAlertAsFavorite = (alertId: string) => {
    const updatedAlerts =
      paginatedAlerts?.pages.flatMap((page) =>
        page.data.map((alert) => (alert.id === alertId ? { ...alert, isFavorite: !alert.isFavorite } : alert)),
      ) ?? [];

    setQueryData(updatedAlerts);
  };

  const handleUpdateFilters = useCallback(
    (updatedFilters: FilteredValues[]) => {
      setFilteredValues(updatedFilters);

      const speciesFilter = updatedFilters.find((filter) => filter.id === FilterType.Species);
      if (speciesFilter) {
        if (speciesFilter.filteredValues.length > 0) {
          setFilteredSpeciesId(speciesFilter.filteredValues[0].value);
          setDisableBreeds(false);
          refetchBreeds();
        } else {
          setDisableBreeds(true);
        }
      }

      setFiltersQueryString(buildQueryString(updatedFilters));
    },
    [refetchBreeds],
  );

  const renderContent = () => {
    if (isError) {
      return (
        <div className="flex mx-auto p-6 mt-[-12px] justify-center items-center h-full">
          <DefaultError size="3xl" />
        </div>
      );
    }

    if (!paginatedAlerts || isLoading) {
      return <FiltersSkeleton />;
    }

    if (foundAlerts.length <= 0) {
      return (
        <div className="flex mx-auto p-6 mt-2 justify-center items-center h-full">
          <NoData />
        </div>
      );
    }

    return (
      <div
        className="grid grid-cols-1 justify-items-center lg:grid-cols-2 min-[1580px]:grid-cols-3
       grid-flow-row gap-x-8 gap-y-12 my-6 px-8"
      >
        {foundAlerts.map((alert) => (
          <AlertCard
            type="found"
            key={alert.id}
            alertId={alert.id}
            isFavorite={alert.isFavorite}
            owner={alert.owner}
            pet={alert.pet}
            toggleAlertFavorite={(alertId) => setAlertAsFavorite(alertId)}
            showIsFavorite
            showMessageOwner
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    setFilters([
      {
        id: FilterType.Species,
        text: "Espécie",
        availableValues: species ?? [],
        disabled: !disableBreeds,
        disabledText: "É possível filtrar apenas por uma espécie",
        shouldBeShown: true,
      },
      {
        id: FilterType.Breed,
        text: "Raça",
        availableValues: breeds ?? [],
        disabled: disableBreeds,
        disabledText: "Selecione a espécie para filtrar pela raça",
        shouldBeShown: true,
      },
      {
        id: FilterType.Gender,
        text: "Sexo",
        availableValues: genders ?? [],
        disabled: false,
        shouldBeShown: true,
      },
      {
        id: FilterType.Age,
        text: "Idade",
        availableValues: ages ?? [],
        disabled: false,
        shouldBeShown: true,
      },
      {
        id: FilterType.Size,
        text: "Porte",
        availableValues: sizes ?? [],
        disabled: false,
        shouldBeShown: true,
      },
      {
        id: FilterType.Color,
        text: "Cor",
        availableValues: colors?.map((c) => ({ label: c.name, value: c.id.toString() })) ?? [],
        disabled: false,
        shouldBeShown: false,
      },
    ]);
  }, [ages, breeds, colors, disableBreeds, genders, sizes, species]);

  return (
    <>
      <main className="relative">
        <MetaTags
          title="Animais Encontrados | AcheMeuPet"
          description="Veja animais que foram encontrados e aguardam resgate. Ajude a reunir pets perdidos com seus donos."
          keywords="animais encontrados, pets perdidos, resgate animal, animais achados"
        />
        <Header />
        <section className="lg:flex mb-6">
          {isMobile ? (
            <div className="flex max-[360px]:flex-col max-[360px]:gap-2.5 justify-between mt-4 mx-6">
              <AlertFilters
                isMobile
                filters={filters}
                filteredValues={filteredValues}
                mapPosition={mapPosition}
                colors={colors ?? []}
                handleUpdateFilters={handleUpdateFilters}
                setMapPosition={setMapPosition}
                handleSelectFilter={handleSelectFilter}
                handleUpdateLocationFilter={handleLocationFilter}
                clearAllFilters={clearAllFilters}
              />
              {showOutsideNewAlertBtn && <CreateFoundAlertButton />}
            </div>
          ) : (
            <AlertFilters
              isMobile={false}
              filters={filters}
              filteredValues={filteredValues}
              mapPosition={mapPosition}
              colors={colors ?? []}
              handleUpdateFilters={handleUpdateFilters}
              setMapPosition={setMapPosition}
              handleSelectFilter={handleSelectFilter}
              handleUpdateLocationFilter={handleLocationFilter}
              clearAllFilters={clearAllFilters}
            />
          )}
          <div className="flex flex-col bg-white w-full max-w-[90%] lg:max-w-[60%] mx-auto 2xl:ml-16 my-6 rounded shadow-md">
            <FoundAnimalListingHeading />

            {renderContent()}

            {isFetchingNextPage && (
              <div className="py-5 flex flex-col items-center mx-auto">
                <Loader />
              </div>
            )}
          </div>
        </section>
        <ConversationsSidebar />
      </main>

      <Footer />
    </>
  );
}
