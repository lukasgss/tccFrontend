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

  const formattedAlerts = userSavedAlerts
    ? [
        ...userSavedAlerts.adoptionAlerts.map((alert: any) => ({
          ...alert,
          type: "adoption" as const,
        })),
        ...userSavedAlerts.foundAnimalAlerts.map((alert: any) => ({
          ...alert,
          type: "found" as const,
        })),
        ...userSavedAlerts.missingFavorites.map((favorite: any) => {
          const alert = favorite.missingAlert;
          return {
            id: alert.id,
            type: "missing" as const,
            pet: {
              ...alert.pet,
              // Transform string values to object format
              gender: { id: alert.pet.gender === "Macho" ? 1 : 2, name: alert.pet.gender },
              age: { id: 0, name: alert.pet.age },
              size: { id: 0, name: alert.pet.size },
              breed: { id: 0, name: "Não especificado" },
            },
            owner: favorite.owner,
          };
        }),
      ]
    : [];

  return (
    <main className="relative">
      <MetaTags
        title="Meus alertas salvos | AcheMeuPet"
        description="Visualize seus alertas salvos no AcheMeuPet. Acompanhe animais perdidos e oportunidades de adoção que você salvou."
        keywords="alertas salvos, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />
      <Header />
      <div
        className="bg-white p-8 shadow-md rounded mt-12 mx-auto w-full max-w-[500px]
          sm:max-w-none sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] mb-5"
      >
        <Title order={3}>Alertas Salvos</Title>
        <div className="mt-8">
          {isPending && <FiltersSkeleton />}
          {!isPending && formattedAlerts.length === 0 && (
            <NoData
              title="Você ainda não possui nenhum alerta salvo..."
              message="Que tal demonstrar carinho aos animais e salvar alguns alertas para olhar depois? ;^)"
            />
          )}
          {formattedAlerts.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-x-8 gap-y-12 my-6">
              {formattedAlerts.map((alert) => (
                <AlertCard
                  type={alert.type}
                  key={alert.id}
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
