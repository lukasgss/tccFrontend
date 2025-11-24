import { Button, Grid, Group, Title, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ListCardsFallback from "../../../components/Common/Fallback/ListCardsFallback";
import NoDataCard from "../../../components/Common/NoData/NoDataCard";
import CardSkeleton from "../../../components/Common/Skeletons/CardSkeleton";
import { GeoLocationContext } from "../../../contexts/GeoLocationContext";
import useSuggestedAlertsQuery from "../../../queries/useSuggestedAlertsQuery";
import AlertCard from "./AlertCard";

export default function SuggestedAdoptionAlerts() {
  const userLocation = useContext(GeoLocationContext);
  const isMobile = useMediaQuery(`(max-width: ${em(1000)})`);
  const shouldShowOneCard = useMediaQuery(`(max-width: ${em(870)})`);

  const { data, isLoading, isError, refetch } = useSuggestedAlertsQuery(userLocation.location);

  useEffect(() => {
    refetch();
  }, [refetch, userLocation.location?.latitude, userLocation.location?.longitude]);

  const suggestedAlerts = isMobile ? data?.slice(0, 2) : data;

  return (
    <div className="bg-[#efeef1] w-full flex justify-center">
      <Group
        display="flex"
        className="w-full flex flex-col items-center min-[830px]:max-w-[70%] min-[1750px]:max-w-[85%] lg:px-4
         sm:px-8 2xl:px-16 mt-12 mb-24 bg-[#efeef1]"
      >
        {isLoading && !isError && (
          <div className="w-full px-3">
            <h3 className="text-center text-3xl mb-4">Encontrando pets para você...</h3>
            <div className="flex flex-col items-center md:flex-row gap-8 justify-center">
              {Array.from({ length: shouldShowOneCard ? 1 : 3 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <CardSkeleton key={index} />
              ))}
            </div>
          </div>
        )}
        {!isLoading &&
          !isError &&
          (suggestedAlerts && suggestedAlerts.length > 0 ? (
            <div className="bg-white p-5 lg:p-8 rounded-md border border-gray-300">
              <Title className="text-4xl font-bold text-center mb-10">Pets em adoção sugeridos para você</Title>
              <Grid columns={4} justify="center" gutter="xl">
                {suggestedAlerts?.map((alert) => (
                  <Grid.Col key={alert.id} span="content">
                    <AlertCard
                      type="adoption"
                      alertId={alert.id}
                      name={alert.pet.name}
                      breed={alert.pet.breed.name}
                      gender={alert.pet.gender.name}
                      image={alert.pet.images[0]}
                    />
                  </Grid.Col>
                ))}
              </Grid>
              <div className="flex justify-center mt-8">
                <Link to="/adocoes">
                  <Button variant="filled" size="md">
                    Ver alertas criados
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <NoDataCard title="Pets em adoção sugeridos para você" />
          ))}

        {!isLoading && isError && (
          <div className="w-full max-w-md mt-8">
            <ListCardsFallback
              message="Oops! Não foi possível obter os alertas sugeridos..."
              subMessage="Não foi possível obter os alertas sugeridos, verifique sua conexão de internet e tente novamente."
            />
          </div>
        )}
      </Group>
    </div>
  );
}
