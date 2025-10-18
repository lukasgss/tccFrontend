import { rem, TextInput, Title } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import AlertCard from "../../components/Common/Alerts/AlertCard/AlertCard";
import NoData from "../../components/Common/NoData/NoData";
import FiltersSkeleton from "../../components/Common/Skeletons/AdoptionListingsSkeleton";
import Header from "../../components/Headers/Header/Header";
import useUserCreatedAlertsQuery from "../../queries/useUserCreatedAlertsQuery";

export default function UserCreatedAlerts() {
  const [search, setSearch] = useState("");

  const { data: userCreatedAlerts, isPending } = useUserCreatedAlertsQuery();

  const filteredAlerts = userCreatedAlerts?.filter((alert) =>
    alert.pet.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="relative">
      <Header />

      <div
        className=" bg-white p-8 shadow-md rounded mt-12 mx-auto w-full max-w-[500px] sm:max-w-none sm:w-[500px] 
            md:w-[600px] lg:w-[700px] xl:w-[800px] mb-5"
      >
        <div className="flex flex-col gap-4 lg:flex-row justify-between">
          <Title order={3}>Alertas Criados</Title>
          {userCreatedAlerts && userCreatedAlerts.length > 0 && (
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

          {userCreatedAlerts?.length === 0 && (
            <NoData
              title="Você ainda não possui nenhum alerta criado..."
              message="Opa! Sua galeria de patinhas está vazia. Conhece algum bichinho precisando de um lar? 
              Compartilhe e espalhe o amor dos animais!"
            />
          )}

          {userCreatedAlerts && userCreatedAlerts?.length > 0 && filteredAlerts?.length === 0 && (
            <NoData title="Alerta não encontrado" message="Você não possui alerta cadastrado com o nome filtrado." />
          )}

          {filteredAlerts && filteredAlerts.length > 0 ? (
            <div
              className="grid grid-cols-1 justify-items-center lg:grid-cols-2 
            min-[1580px]:grid-cols-3 grid-flow-row gap-x-8 gap-y-12 my-6"
            >
              {filteredAlerts?.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alertId={alert.id}
                  owner={alert.owner}
                  pet={alert.pet}
                  isFavorite={alert.isFavorite}
                  showIsFavorite
                  showMessageOwner={false}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
