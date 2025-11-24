import { Image, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import AlertCard from "../../components/Common/Alerts/AlertCard/AlertCard";
import ContactWhatsApp from "../../components/Common/Contact/ContactWhatsApp";
import OnlyWhatsAppMessagesAlert from "../../components/Common/Contact/OnlyWhatsAppMessagesAlert";
import DefaultError from "../../components/Common/Errors/DefaultError";
import NoData from "../../components/Common/NoData/NoData";
import FiltersSkeleton from "../../components/Common/Skeletons/AdoptionListingsSkeleton";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Headers/Header/Header";
import MetaTags from "../../components/Utils/MetaTags";
import useUserProfileQuery from "../../queries/useUserProfileQuery";
import { formatWhatsappPhoneNumber } from "../../utils/formatters";
import UserDataLoading from "./components/UserDataLoading";

export default function UserProfile() {
  const { id } = useParams();
  const { data: userProfile, isPending, isError } = useUserProfileQuery(id);

  return (
    <>
      <MetaTags
        title={userProfile?.fullName ? `${userProfile?.fullName} | AcheMeuPet` : "Perfil | AcheMeuPet"}
        description="Gerencie seus alertas no AcheMeuPet. Atualize informações sobre animais perdidos ou para adoção. Seus alertas são cruciais para reunir pets com suas famílias e encontrar novos lares."
        keywords="alertas criados, adoção animal, adoção de animais, listagem de adoções, pets para adotar, resgate animal, animais perdidos"
      />

      <Header />
      <main>
        <div className="flex flex-col lg:flex-row sm:gap-7 lg:gap-5 my-14">
          <div
            className="block lg:sticky top-32 h-fit bg-white shadow-md rounded px-5 pb-4
            sm:mx-auto lg:ml-10 lg:mr-4 sm:max-w-[325px]"
          >
            {isPending && <UserDataLoading />}

            {!isPending && isError && (
              <div className="flex mx-auto p-6 mt-[-12px] justify-center items-center h-full">
                <DefaultError size="3xl" />
              </div>
            )}

            {userProfile && !isPending && !isError && (
              <>
                <Image
                  src={userProfile?.image}
                  alt="Imagem de perfil"
                  w={150}
                  h={150}
                  className="rounded-full mx-auto mt-[-3rem]"
                />
                <div className="flex flex-col gap-1 items-center mt-2">
                  <div className="text-center">
                    <Title order={4} className="mx-auto">
                      {userProfile?.fullName}
                    </Title>
                    <Text>{userProfile?.phoneNumber}</Text>
                    {userProfile?.onlyWhatsAppMessages && (
                      <div className="mt-2">
                        <OnlyWhatsAppMessagesAlert fullName={userProfile.fullName} />
                      </div>
                    )}
                  </div>
                  {userProfile?.phoneNumber && (
                    <ContactWhatsApp
                      url={`https://api.whatsapp.com/send?phone=${formatWhatsappPhoneNumber(userProfile.phoneNumber)}&message=Olá! Estou entrando em contato pelo AcheMeuPet para conversar sobre os animais disponíveis.`}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          <div
            className="bg-white shadow-md rounded w-full py-6 md:mx-auto lg:mx-0 lg:mr-6 max-w-[900px]
          mt-8 sm:mt-0 min-h-[400px]"
          >
            <Title order={3} className="px-6">
              Animais para adoção
            </Title>

            {isPending && <FiltersSkeleton />}

            {!isPending && isError && (
              <div className="flex mx-auto p-6 mt-[-12px] justify-center items-center h-full">
                <DefaultError size="3xl" />
              </div>
            )}

            {userProfile?.adoptionAlerts?.length === 0 && <NoData className="mt-8" />}

            {userProfile?.adoptionAlerts && userProfile?.adoptionAlerts.length > 0 && (
              <div
                className="grid grid-cols-1 justify-items-center lg:grid-cols-2 min-[1580px]:grid-cols-3
                grid-flow-row gap-x-8 gap-y-12 my-6 px-8"
              >
                {userProfile?.adoptionAlerts && userProfile?.adoptionAlerts.length > 0 ? (
                  userProfile.adoptionAlerts.map((alert) => (
                    <AlertCard
                      type="adoption"
                      key={alert.id}
                      alertId={alert.id}
                      owner={{
                        fullName: userProfile.fullName,
                        image: userProfile.image,
                        phoneNumber: userProfile.phoneNumber,
                        id: userProfile.id,
                        onlyWhatsAppMessages: userProfile.onlyWhatsAppMessages,
                      }}
                      pet={alert.pet}
                      isFavorite={alert.isFavorite}
                    />
                  ))
                ) : (
                  <NoData />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
