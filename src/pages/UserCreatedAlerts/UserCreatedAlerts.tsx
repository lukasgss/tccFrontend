import { rem, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import ConversationsSidebar from "../../components/Chat/components/ConversationSidebar";
import AlertCard from "../../components/Common/Alerts/AlertCard/AlertCard";
import NoData from "../../components/Common/NoData/NoData";
import FiltersSkeleton from "../../components/Common/Skeletons/AdoptionListingsSkeleton";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import useUserCreatedAlertsQuery from "../../queries/useUserCreatedAlertsQuery";
import { PetResponseNoOwner } from "../../services/requests/Pets/types";

export default function UserCreatedAlerts() {
  const [search, setSearch] = useState("");
  const { data: userCreatedAlerts, isPending } = useUserCreatedAlertsQuery();
  const filteredAlerts = userCreatedAlerts
    ? [
        ...userCreatedAlerts.adoptionAlerts
          .filter((alert) => !alert.pet.name || alert.pet.name.toLowerCase().startsWith(search.toLowerCase()))
          .map((alert) => ({ ...alert, type: "adoption" as const })),
        ...userCreatedAlerts.foundAnimalAlerts
          .filter((alert) => !alert.name || alert.name.toLowerCase().startsWith(search.toLowerCase()))
          .map((alert) => ({ ...alert, type: "found" as const })),
      ]
    : [];

  const hasAlerts =
    userCreatedAlerts &&
    (userCreatedAlerts.adoptionAlerts.length > 0 || userCreatedAlerts.foundAnimalAlerts.length > 0);

  return (
    <main className="relative">
      <MetaTags
        title="Meus alertas criados | AcheMeuPet"
        description="Gerencie seus alertas no AcheMeuPet. Atualize informações sobre animais perdidos ou para adoção. Seus alertas são cruciais para reunir pets com suas famílias e encontrar novos lares."
        keywords="alertas criados, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />
      <Header />
      <div
        className="bg-white p-8 shadow-md rounded mt-12 mx-auto w-full max-w-[500px]
          sm:max-w-none sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] mb-5"
      >
        <div className="flex flex-col gap-4 lg:flex-row justify-between">
          <Title order={3}>Alertas Criados</Title>
          {hasAlerts && (
            <TextInput
              radius="xl"
              size="md"
              placeholder="Pesquisar..."
              rightSectionWidth={42}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              rightSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            />
          )}
        </div>
        <div className="mt-8">
          {isPending && <FiltersSkeleton />}
          {!isPending && filteredAlerts.length === 0 && search === "" && (
            <NoData
              title="Você ainda não possui nenhum alerta criado..."
              message="Opa! Sua galeria de patinhas está vazia. Conhece algum bichinho precisando de um lar?
              Compartilhe e espalhe o amor dos animais!"
              centerText
            />
          )}
          {!isPending && filteredAlerts.length === 0 && search !== "" && (
            <NoData title="Alerta não encontrado" message="Você não possui alerta cadastrado com o nome filtrado." />
          )}
          {filteredAlerts.length > 0 && (
            <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center gap-x-8 gap-y-12 my-6">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  type={alert.type}
                  key={alert.id}
                  alertId={alert.id}
                  owner={alert.owner}
                  pet={alert.pet as PetResponseNoOwner}
                  isFavorite={false}
                  showIsFavorite
                  showMessageOwner={false}
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
