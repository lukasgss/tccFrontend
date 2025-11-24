import { Title } from "@mantine/core";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import AlertCard from "../../components/Common/Alerts/AlertCard/AlertCard";
import NoData from "../../components/Common/NoData/NoData";
import FiltersSkeleton from "../../components/Common/Skeletons/AdoptionListingsSkeleton";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import useUserSavedAlertsQuery from "../../queries/useUserSavedAlertsQuery";

export default function UserSavedAlerts() {
  const { data: userSavedAlerts, isPending } = useUserSavedAlertsQuery();

  const mergeAlerts = () => {
    if (!userSavedAlerts) {
      return [];
    }

    const adoptionWithType = userSavedAlerts.adoptionAlerts.map((alert: any) => ({
      ...alert,
      type: "adoption",
    }));

    const foundWithType = userSavedAlerts.foundAnimalAlerts.map((alert: any) => ({
      ...alert,
      type: "found",
    }));

    return [...adoptionWithType, ...foundWithType];
  };

  const formattedAlerts = mergeAlerts();

  return (
    <main className="relative">
      <MetaTags
        title="Meus alertas salvos | AcheMeuPet"
        description="Visualize seus alertas salvos no AcheMeuPet. Acompanhe animais perdidos e oportunidades de adoção que você salvou."
        keywords="alertas salvos, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />

      <div
        className="bg-white p-8 shadow-md rounded mt-12 mx-auto w-full max-w-[500px] sm:max-w-none sm:w-[500px]
            md:w-[600px] lg:w-[700px] xl:w-[800px] mb-5"
      >
        <Title order={3}>Alertas Salvos</Title>

        <div className="mt-8">
          {isPending && <FiltersSkeleton />}

          {userSavedAlerts?.length === 0 && (
            <NoData
              title="Você ainda não possui nenhum alerta salvo..."
              message="Que tal demonstrar carinho aos animais e salvar alguns alertas para olhar depois? ;)"
            />
          )}

          {formattedAlerts && (
            <div
              className="grid grid-cols-1 justify-items-center lg:grid-cols-2
                min-[1580px]:grid-cols-3 grid-flow-row gap-x-8 gap-y-12 my-6"
            >
              {formattedAlerts?.map((alert) => (
                <AlertCard
                  type={alert.type}
                  key={Math.random()}
                  alertId={alert.id}
                  owner={alert.owner}
                  pet={alert.pet}
                  isFavorite
                  showIsFavorite={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ConversationsSidebar />
    </main>
  );
}
