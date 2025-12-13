import { Badge, Button, Divider, em, Modal, Text, Title, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { CalendarDots, CheckCircle, MapPin as MapPinIcon } from "@phosphor-icons/react";
import { IconFlag } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConversationsSidebar from "../../../../components/Chat/components/ConversationSidebar";
import AlertCarousel from "../../../../components/Common/Carousel/AlertCarousel/AlertCarousel";
import ModalCarousel from "../../../../components/Common/Carousel/ModalCarousel/ModalCarousel";
import FormMessage, { FormNotification } from "../../../../components/Common/Errors/FormMessage";
import { ApiError } from "../../../../components/Common/Errors/types";
import ReportContent from "../../../../components/Common/Modals/ReportContent";
import IndividualAlertSkeleton from "../../../../components/Common/Skeletons/IndividualAlertSkeleton";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Headers/Header/Header";
import MetaTags from "../../../../components/Utils/MetaTags";
import { defaultFormErrorMessage } from "../../../../constants/applicationConstants";
import { AuthContext } from "../../../../contexts/AuthContext";
import Notify from "../../../../hooks/notifications/notifications";
import useFoundAnimalAlertByIdQuery from "../../../../queries/useFoundAnimalAlertByIdQuery";
import { ToggleFoundAnimalAlertStatus } from "../../../../services/requests/Alerts/Found/foundAlertsService";
import { RecentlyViewedPet } from "../../../../services/requests/Pets/types";
import { formatDateOnly } from "../../../../utils/dates";
import { formatColorNames } from "../../../../utils/formatters";
import ShareButton from "./ShareButton";
import OtherOptionsButton from "../../Adoption/IndividualAlert/components/OtherOptionsButton";
import AlertMap from "../../Adoption/IndividualAlert/components/AlertMap";
import OwnerData from "../../Adoption/IndividualAlert/components/OwnerData";
import PetCharacteristic from "../../Adoption/IndividualAlert/components/PetCharacteristic";
import FoundAnimalContact from "./FoundAnimalContact";

type Section = {
  name: string;
  value: string;
};

type AnimalCharacteristics = {
  leftSection: Section[];
  rightSection: Section[];
};

export default function IndividualFoundAnimalAlert() {
  const [openedCarousel, setOpenedCarousel] = useState(false);
  const [indexInitialSlide, setIndexInitialSlide] = useState(0);
  const [reportMessage, setReportMessage] = useState<FormNotification | null>(null);

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  const { alertId } = useParams();

  const { data } = useFoundAnimalAlertByIdQuery(alertId!);
  const [isRecovered, setIsRecovered] = useState<boolean | null>(null);

  const { userData } = useContext(AuthContext);

  const theme = useMantineTheme();

  const [reportContentOpened, { open: openReportContent, close: closeReportContent }] = useDisclosure(false);

  function handleImageClick(imageIndex: number) {
    setIndexInitialSlide(imageIndex);
    setOpenedCarousel(true);
  }

  const handleToggleRecoveryStatus = () => {
    if (isRecovered === null) {
      if (data?.recoveryDate) {
        setIsRecovered(false);
      } else {
        setIsRecovered(true);
      }
    } else {
      setIsRecovered((prevValue) => !prevValue);
    }
  };

  const { mutateAsync: toggleRecoveryStatusAsync, isPending: loadingToggleRecovery } = useMutation({
    mutationFn: () => ToggleFoundAnimalAlertStatus(data!.id),
    onSuccess: () => handleToggleRecoveryStatus(),
    onError: (e) => {
      const error = e as AxiosError<ApiError>;
      Notify({ type: "error", message: error.response?.data.message ?? defaultFormErrorMessage });
    },
  });

  useEffect(() => {
    if (!data || !data.id) {
      return;
    }

    const petData: RecentlyViewedPet = {
      type: "found",
      id: data.id,
      name: data.name || "Animal sem nome",
      images: data.pet.images,
      gender: data.pet.gender,
      breed: data.pet.breed,
      ownerId: data.owner.id,
    };

    const recentlyViewedPets = JSON.parse(localStorage.getItem("recentlyViewedAlerts") || "[]");

    const updatedRecentlyViewedPets = recentlyViewedPets.filter((pet: RecentlyViewedPet) => pet.id !== petData.id);

    updatedRecentlyViewedPets.unshift(petData);

    const maximumAmountOfRecentlyViewedPets = 4;
    const limitedRecentlyViewedPets = updatedRecentlyViewedPets.slice(0, maximumAmountOfRecentlyViewedPets);

    localStorage.setItem("recentlyViewedAlerts", JSON.stringify(limitedRecentlyViewedPets));
  }, [data]);

  if (!data) {
    return <IndividualAlertSkeleton />;
  }

  const displayName = data.name || "Animal sem nome";
  const displayGender = data.pet.gender?.name || "Desconhecido";
  const displayBreed = data.pet.breed?.name || "Desconhecido";

  const animalCharacteristics: AnimalCharacteristics = {
    leftSection: [
      {
        name: "Espécie",
        value: data.pet.species.name,
      },
      {
        name: "Raça",
        value: displayBreed,
      },
      {
        name: "Sexo",
        value: displayGender,
      },
    ],
    rightSection: [
      {
        name: "Idade aproximada",
        value: data.pet.age?.name || "Desconhecida",
      },
      {
        name: "Porte",
        value: data.pet.size?.name || "Desconhecido",
      },
      {
        name: "Cores",
        value: formatColorNames(data.pet.colors || []),
      },
    ],
  };

  const isOwnerOfAlert = data.owner.id === userData?.id;

  const isPetRecovered = () => {
    if (isRecovered === null) {
      return data?.recoveryDate !== null;
    }
    return isRecovered;
  };

  const getToggleRecoveryButtonText = () => {
    return isPetRecovered() ? "Remover confirmação de resgate" : "Confirmar resgate";
  };

  const otherOptionItems = [
    {
      leftSection: <IconFlag size={20} className="text-[#4d4751]" />,
      text: "Denunciar alerta",
      onClick: openReportContent,
    },
  ];

  return (
    <>
      <main className="relative">
        <MetaTags
          title={`Animal encontrado: ${displayName} | AcheMeuPet`}
          description={`${displayName} foi encontrado e aguarda resgate. Ajude a reunir este ${displayGender.toLowerCase()} com seu dono através do AcheMeuPet.`}
          keywords="animal encontrado, pet perdido, resgate animal, AcheMeuPet, encontrei um cachorro, encontrei um gato"
        />
        <Header />
        <AlertCarousel images={data.pet.images} onClickImage={(imageIndex: number) => handleImageClick(imageIndex)} />
        <ModalCarousel
          opened={openedCarousel}
          onClose={() => setOpenedCarousel(false)}
          images={data.pet.images}
          indexInitialSlide={indexInitialSlide}
        />
        <div className="flex flex-col lg:flex-row gap-7 w-full mx-auto max-w-[90%] py-8">
          <div className="bg-white w-full p-6 rounded-md shadow-md">
            {reportMessage && (
              <div className="mb-6">
                <FormMessage
                  type={reportMessage.type}
                  message={reportMessage.message}
                  className="!m-0"
                  closeMessage={() => setReportMessage(null)}
                />
              </div>
            )}
            <div className="flex gap-3 justify-between items-end md:items-center">
              <div className="flex items-center gap-5">
                <Title className="font-bolder text-3xl lg:text-[48px]">{displayName}</Title>

                {isPetRecovered() && !isMobile ? (
                  <Badge
                    rightSection={<CheckCircle size={18} weight="fill" />}
                    size="lg"
                    variant="filled"
                    color={theme.colors.green[7]}
                    className="w-fit truncate border border-white"
                  >
                    Resgatado
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-col justify-center lg:flex-row lg:gap-5">
                <div className="flex gap-2 justify-center">
                  {isOwnerOfAlert && !isMobile ? (
                    <Button type="button" onClick={() => toggleRecoveryStatusAsync()} loading={loadingToggleRecovery}>
                      {getToggleRecoveryButtonText()}
                    </Button>
                  ) : null}

                  <ShareButton type="found" petName={displayName} petGender={data.pet.gender?.name ?? null} />

                  <OtherOptionsButton items={otherOptionItems} loading={false} />
                </div>
              </div>
            </div>

            {isPetRecovered() && isMobile ? (
              <div className="mt-2">
                <Badge
                  rightSection={<CheckCircle size={18} weight="fill" />}
                  size="lg"
                  variant="filled"
                  color={theme.colors.green[7]}
                  className="w-full truncate border mb-1 border-white"
                >
                  Resgatado
                </Badge>
              </div>
            ) : null}

            {isOwnerOfAlert && isMobile ? (
              <div className="flex w-full h-fit md:justify-end">
                <Button
                  type="button"
                  onClick={() => toggleRecoveryStatusAsync()}
                  loading={loadingToggleRecovery}
                  className="mt-1 mb-1.5 w-full md:w-fit"
                >
                  {getToggleRecoveryButtonText()}
                </Button>
              </div>
            ) : null}

            {isPetRecovered() && (
              <div className="flex gap-1.5 mt-2 md:mt-3 mb-0.5">
                <CalendarDots size={20} />
                <span>Resgatado em {formatDateOnly(data.recoveryDate ?? undefined)}</span>
              </div>
            )}

            <div className={`flex gap-1.5 ${isPetRecovered() ? "mt-1" : "mt-2 md:mt-3"}`}>
              <MapPinIcon size={20} />
              <span>
                {data.geoLocation?.city && data.geoLocation?.state ? (
                  <span>{`${data.geoLocation.city.text}, ${data.geoLocation.state.text}`}</span>
                ) : (
                  <span>Localização não encontrada</span>
                )}
              </span>
            </div>

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />

              <Title order={3} className="uppercase mt-2">
                Características
              </Title>

              <div className="flex flex-col sm:flex-row sm:gap-60">
                <div>
                  {animalCharacteristics.leftSection.map((characteristic) => (
                    <PetCharacteristic
                      key={characteristic.name}
                      characteristic={characteristic.name}
                      value={characteristic.value}
                    />
                  ))}
                </div>
                <div>
                  {animalCharacteristics.rightSection.map((characteristic) => (
                    <PetCharacteristic
                      key={characteristic.name}
                      characteristic={characteristic.name}
                      value={characteristic.value}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />
              <Title order={3} className="uppercase mb-1.5">
                Descrição
              </Title>

              <Text className="break-words">{data.description || "Não informado"}</Text>
            </div>

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />
              <Title order={3} className="uppercase mb-1.5">
                Local onde foi encontrado
              </Title>
              <AlertMap
                alertCoordinates={
                  data.foundLocationLatitude && data.foundLocationLongitude
                    ? [data.foundLocationLatitude, data.foundLocationLongitude]
                    : null
                }
              />

              <div className="mt-5 flex flex-col sm:flex-row sm:gap-28">
                <div>
                  <PetCharacteristic
                    characteristic="Bairro"
                    value={data.neighborhood || data.geoLocation?.neighborhood || "Não informado"}
                  />
                  <PetCharacteristic characteristic="Estado" value={data.geoLocation?.state.text || "Não informado"} />
                </div>
                <div>
                  <PetCharacteristic characteristic="Cidade" value={data.geoLocation?.city.text || "Não informado"} />
                </div>
              </div>
            </div>
          </div>
          {!isOwnerOfAlert ? (
            <div className="flex flex-col gap-5 w-full lg:max-w-[350px] h-fit mb-6 lg:mb-0">
              <FoundAnimalContact
                ownerData={data.owner}
                ownerPhoneNumber={data.owner.phoneNumber}
                animalName={displayName}
              />
              <OwnerData owner={data.owner} petName={displayName} />
            </div>
          ) : null}
        </div>
        <ConversationsSidebar />
      </main>

      <Modal opened={reportContentOpened} onClose={closeReportContent} centered withCloseButton={false}>
        <ReportContent
          alertType="found"
          alertId={data.id}
          closeModal={closeReportContent}
          setReportMessage={setReportMessage}
        />
      </Modal>

      <Footer />
    </>
  );
}
