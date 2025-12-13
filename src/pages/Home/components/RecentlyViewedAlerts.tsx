import { Grid, Group, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { GetUserSavedAlerts } from "../../../services/requests/Alerts/Adoption/adoptionAlertService";
import { RecentlyViewedPet } from "../../../services/requests/Pets/types";
import AlertCard from "./AlertCard";

export default function RecentlyViewedAlerts() {
  const recentlyViewedAlerts: RecentlyViewedPet[] = JSON.parse(localStorage.getItem("recentlyViewedAlerts") ?? "[]");
  const { isAuthenticated } = useContext(AuthContext);

  const { data: userSavedAlerts } = useQuery({
    queryKey: ["userSavedAlerts"],
    queryFn: ({ signal }) => GetUserSavedAlerts(signal),
    enabled: isAuthenticated,
  });

  if (recentlyViewedAlerts.length === 0) {
    return null;
  }

  // Helper function to check if an alert is favorited
  const isAlertFavorited = (alertId: string, type: string) => {
    if (!isAuthenticated || !userSavedAlerts) return false;

    if (type === "adoption") {
      return userSavedAlerts.adoptionAlerts?.some((alert: any) => alert.id === alertId) ?? false;
    } else if (type === "found") {
      return userSavedAlerts.foundAnimalAlerts?.some((alert: any) => alert.id === alertId) ?? false;
    } else if (type === "missing") {
      return userSavedAlerts.missingFavorites?.some((fav: any) => fav.missingAlert.id === alertId) ?? false;
    }
    return false;
  };

  return (
    <section className="bg-[#efeef1] w-full flex justify-center">
      <Group
        display="flex"
        className="w-full flex flex-col items-center min-[830px]:max-w-[70%] min-[1750px]:max-w-[85%] lg:px-4
         sm:px-8 2xl:px-16 mt-2 mb-24 bg-[#efeef1]"
      >
        <div className="bg-white p-5 lg:p-8 rounded-md border border-gray-300">
          <Title className="text-4xl font-bold text-center mb-10">Pets vistos recentemente</Title>
          <Grid columns={4} justify="center" gutter="xl">
            {recentlyViewedAlerts?.map((alert) => (
              <Grid.Col key={alert.id} span="content">
                <AlertCard
                  type={alert.type}
                  alertId={alert.id}
                  breed={alert.breed?.name || "Raça desconhecida"}
                  gender={alert.gender?.name || "Desconhecido"}
                  image={alert.images[0]}
                  name={alert.name}
                  isFavorite={isAlertFavorited(alert.id, alert.type)}
                  ownerId={alert.ownerId}
                  key={alert.id}
                />
              </Grid.Col>
            ))}
          </Grid>
        </div>
      </Group>
    </section>
  );
}
