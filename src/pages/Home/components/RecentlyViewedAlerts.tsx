import { Grid, Group, Title } from "@mantine/core";
import { RecentlyViewedPet } from "../../../services/requests/Pets/types";
import AlertCard from "./AlertCard";

export default function RecentlyViewedAlerts() {
  const recentlyViewedAlerts: RecentlyViewedPet[] = JSON.parse(localStorage.getItem("recentlyViewedAlerts") ?? "[]");

  if (recentlyViewedAlerts.length === 0) {
    return null;
  }

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
                  alertId={alert.id}
                  breed={alert.breed.name}
                  gender={alert.gender.name}
                  image={alert.images[0]}
                  name={alert.name}
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
