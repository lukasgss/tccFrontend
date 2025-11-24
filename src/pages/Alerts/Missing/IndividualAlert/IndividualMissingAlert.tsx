import { Badge, Button, Divider, em, Modal, Text, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { CalendarDots, Confetti, HeartStraight, Pencil } from "@phosphor-icons/react";
import { IconFlag, IconMapPin } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { GenderEnum, PetResponse, RecentlyViewedPet } from "../../../../services/requests/Pets/types";
import { formatDateOnly } from "../../../../utils/dates";
import { formatColorNames } from "../../../../utils/formatters";
import {
  ToggleMissingAlertFavorite,
  ToggleMissingAlertRecovery,
} from "../../../../services/requests/Alerts/Missing/missingAlertsService";
import AlertMap from "../../Adoption/IndividualAlert/components/AlertMap";
import OwnerData from "../../Adoption/IndividualAlert/components/OwnerData";
import PetCharacteristic from "../../Adoption/IndividualAlert/components/PetCharacteristic";
import FoundMyPet from "./components/FoundMyPet";
import OtherOptionsButton from "./components/OtherOptionsButton";
import useMissingAlertByIdQuery from "./useMissingAlertByIdQueryHandler";
import ShareButton from "./components/ShareButton";

type Section = {
  name: string;
  value: string;
};

type PetCharacteristics = {
  leftSection: Section[];
  rightSection: Section[];
};

export default function IndividualMissingAlert() {
  const [openedCarousel, setOpenedCarousel] = useState(false);
  const [indexInitialSlide, setIndexInitialSlide] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reportMessage, setReportMessage] = useState<FormNotification | null>(null);

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  const { alertId } = useParams();

  const { data } = useMissingAlertByIdQuery(alertId!);
  const [isRecovered, setIsRecovered] = useState<boolean | null>(null);

  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = useMantineTheme();

  const [reportContentOpened, { open: openReportContent, close: closeReportContent }] = useDisclosure(false);

  function handleImageClick(imageIndex: number) {
    setIndexInitialSlide(imageIndex);
    setOpenedCarousel(true);
  }

  const { mutateAsync: toggleMissingAlertFavoriteAsync } = useMutation({
    mutationFn: () => ToggleMissingAlertFavorite(data!.id),
    onError: (e) => {
      const error = e as AxiosError<ApiError>;
      Notify({ type: "error", message: error.response?.data.message ?? defaultFormErrorMessage });
      setIsFavorite((prevValue) => !prevValue);
    },
  });

  const handleToggleMissingRecovery = () => {
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

  const { mutateAsync: toggleMissingRecoveryAsync, isPending: loadingToggleRecovery } = useMutation({
    mutationFn: () => ToggleMissingAlertRecovery(data!.id),
    onSuccess: () => handleToggleMissingRecovery(),
    onError: (e) => {
      const error = e as AxiosError<ApiError>;
      Notify({ type: "error", message: error.response?.data.message ?? defaultFormErrorMessage });
      setIsRecovered((prevValue) => !prevValue);
    },
  });

  async function handleFavoriteAlert() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsFavorite((prevValue) => !prevValue);
    await toggleMissingAlertFavoriteAsync();
  }

  useEffect(() => {
    setIsFavorite(data?.isFavorite || false);
  }, [data?.isFavorite]);

  useEffect(() => {
    if (!data || !data.id) {
      return;
    }

    const petData: RecentlyViewedPet = {
      type: "missing",
      id: data.id,
      name: data.pet.name,
      images: data.pet.images,
      gender: data.pet.gender,
      breed: data.pet.breed,
    };

    const recentlyViewedPets = JSON.parse(localStorage.getItem("recentlyViewedAlerts") || "[]");

    const updatedRecentlyViewedPets = recentlyViewedPets.filter((pet: PetResponse) => pet.id !== petData.id);

    updatedRecentlyViewedPets.unshift(petData);

    const maximumAmountOfRecentlyViewedPets = 4;
    const limitedRecentlyViewedPets = updatedRecentlyViewedPets.slice(0, maximumAmountOfRecentlyViewedPets);

    localStorage.setItem("recentlyViewedAlerts", JSON.stringify(limitedRecentlyViewedPets));
  }, [data]);

  if (!data) {
    return <IndividualAlertSkeleton />;
  }

  const getGeneralInfoText = (value: boolean | undefined) => {
    if (value === null) {
      return "Desconhecido";
    }

    return value ? "Sim" : "Não";
  };

  const petCharacteristics: PetCharacteristics = {
    leftSection: [
      {
        name: "Espécie",
        value: data.pet.species.name,
      },
      {
        name: "Raça",
        value: data.pet.breed.name,
      },
      {
        name: "Sexo",
        value: data.pet.gender.name,
      },
      {
        name: "Castrado",
        value: getGeneralInfoText(data.pet.isCastrated),
      },
      {
        name: data.pet.species.name === "Cachorro" ? "Negativo para Leishmaniose" : "Negativo para FIV/FELV",
        value: getGeneralInfoText(
          data.pet.species.name === "Cachorro" ? data.pet.isNegativeToLeishmaniasis : data.pet.isNegativeToFivFelv,
        ),
      },
    ],
    rightSection: [
      {
        name: "Idade",
        value: data.pet.age.name,
      },
      {
        name: "Porte",
        value: data.pet.size.name,
      },
      {
        name: "Cores",
        value: formatColorNames(data.pet.colors),
      },
      {
        name: "Vacinado",
        value: getGeneralInfoText(data.pet.isVaccinated),
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
    return isPetRecovered() ? "Remover confirmação de encontro" : "Confirmar que foi encontrado";
  };

  const otherOptionItems = [
    {
      leftSection: <HeartStraight weight={isFavorite ? "fill" : "regular"} size={20} color="red" />,
      text: isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos",
      onClick: handleFavoriteAlert,
    },
    {
      leftSection: <IconFlag size={20} className="text-[#4d4751]" />,
      text: "Denunciar alerta",
      onClick: openReportContent,
    },
  ];

  const getOtherOptionsItems = () => {
    if (isOwnerOfAlert) {
      return otherOptionItems.filter(
        (item) => item.text !== "Adicionar aos favoritos" && item.text !== "Remover dos favoritos",
      );
    }

    return otherOptionItems;
  };

  return (
    <>
      <main className="relative">
        <MetaTags
          title={`${data.pet.name} está desaparecido | AcheMeuPet`}
          description={`Ajude a encontrar ${data.pet.name}, ${data.pet.gender.name === "Macho" ? "um" : "uma"} ${data.pet.species.name.toLowerCase()} desaparecido. Se você viu ${data.pet.gender.name === "Macho" ? "este" : "esta"} pet, entre em contato através do AcheMeuPet.`}
          keywords="pet perdido, animal desaparecido, encontrar pet, pets perdidos, AcheMeuPet, resgate animal"
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
                <Title className="font-bolder text-3xl lg:text-[48px]">{data.pet.name}</Title>

                {isPetRecovered() && !isMobile ? (
                  <Badge
                    rightSection={<Confetti size={18} />}
                    size="lg"
                    variant="filled"
                    color={theme.colors["brand-orange"][6]}
                    className="w-fit truncate border border-white"
                  >
                    Encontrado
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-col justify-center lg:flex-row lg:gap-5">
                <div className="flex gap-2 justify-center">
                  {isOwnerOfAlert && !isMobile ? (
                    <Button type="button" onClick={() => toggleMissingRecoveryAsync()} loading={loadingToggleRecovery}>
                      {getToggleRecoveryButtonText()}
                    </Button>
                  ) : null}

                  {isOwnerOfAlert && (
                    <Link to={`/desaparecidos/editar/${alertId}`}>
                      <Tooltip label="Editar" className="w-fit">
                        <Button className="w-fit p-0.5" variant="subtle">
                          <Pencil weight="duotone" className="text-[#4d4751]" size={30} />
                        </Button>
                      </Tooltip>
                    </Link>
                  )}

                  <ShareButton petName={data.pet.name} petGender={data.pet.gender} />

                  <OtherOptionsButton items={getOtherOptionsItems()} />
                </div>
              </div>
            </div>

            {isPetRecovered() && isMobile ? (
              <div className="mt-2">
                <Badge
                  rightSection={<Confetti size={18} />}
                  size="lg"
                  variant="filled"
                  color={theme.colors["brand-orange"][6]}
                  className="w-full truncate border mb-1 border-white"
                >
                  Encontrado
                </Badge>
              </div>
            ) : null}

            {isOwnerOfAlert && isMobile ? (
              <div className="flex w-full h-fit md:justify-end">
                <Button
                  type="button"
                  onClick={() => toggleMissingRecoveryAsync()}
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
                <span>
                  {data.pet.gender.id === GenderEnum.Male ? "Encontrado em" : "Encontrada em"}{" "}
                  {formatDateOnly(data.recoveryDate)}
                </span>
              </div>
            )}

            <div className={`flex gap-1.5 ${isPetRecovered() ? "mt-1" : "mt-2 md:mt-3"}`}>
              <IconMapPin size={20} />
              {data.geoLocation?.city && data.geoLocation?.state ? (
                <span>{`${data.geoLocation.city.text}, ${data.geoLocation.state.text}`}</span>
              ) : (
                <span>Localização não encontrada</span>
              )}
            </div>

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />

              <Title order={3} className="uppercase mt-2">
                Características
              </Title>

              <div className="flex flex-col sm:flex-row sm:gap-60">
                <div>
                  {petCharacteristics.leftSection.map((characteristic) => (
                    <PetCharacteristic
                      key={characteristic.name}
                      characteristic={characteristic.name}
                      value={characteristic.value}
                    />
                  ))}
                </div>
                <div>
                  {petCharacteristics.rightSection.map((characteristic) => (
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
                Local do desaparecimento
              </Title>
              <AlertMap
                alertCoordinates={
                  data.lastSeenLocationLatitude && data.lastSeenLocationLongitude
                    ? [data?.lastSeenLocationLatitude, data?.lastSeenLocationLongitude]
                    : null
                }
              />

              <div className="mt-5 flex flex-col sm:flex-row sm:gap-28">
                <div>
                  <PetCharacteristic characteristic="Bairro" value={data.neighborhood} />
                  <PetCharacteristic characteristic="Estado" value={data.geoLocation?.state.text} />
                </div>
                <div>
                  <PetCharacteristic characteristic="Cidade" value={data.geoLocation?.city.text} />
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />
              <Title order={3} className="uppercase mb-1.5">
                Data de registro
              </Title>
              <Text>{formatDateOnly(data.registrationDate)}</Text>
            </div>
          </div>
          {!isOwnerOfAlert ? (
            <div className="flex flex-col gap-5 w-full lg:max-w-[350px] h-fit mb-6 lg:mb-0">
              <FoundMyPet ownerData={data.owner} ownerPhoneNumber={data.owner.phoneNumber} petName={data.pet.name} />
              <OwnerData owner={data.owner} petName={data.pet.name} />
            </div>
          ) : null}
        </div>
        <ConversationsSidebar />
      </main>

      <Modal opened={reportContentOpened} onClose={closeReportContent} centered withCloseButton={false}>
        <ReportContent
          alertType="missing"
          alertId={data.id}
          closeModal={closeReportContent}
          setReportMessage={setReportMessage}
        />
      </Modal>

      <Footer />
    </>
  );
}
