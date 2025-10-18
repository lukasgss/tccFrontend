import { Badge, Button, Divider, em, Modal, Text, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { CalendarDots, Confetti, HeartStraight, Pencil } from "@phosphor-icons/react";
import { IconFileText, IconFlag, IconMapPin } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AlertCarousel from "../../../../components/Common/Carousel/AlertCarousel/AlertCarousel";
import ModalCarousel from "../../../../components/Common/Carousel/ModalCarousel/ModalCarousel";
import FormMessage, { FormNotification } from "../../../../components/Common/Errors/FormMessage";
import { ApiError } from "../../../../components/Common/Errors/types";
import AttachmentFile from "../../../../components/Common/File/AttachmentFile";
import ReportContent from "../../../../components/Common/Modals/ReportContent";
import IndividualAlertSkeleton from "../../../../components/Common/Skeletons/IndividualAlertSkeleton";
import Header from "../../../../components/Headers/Header/Header";
import { defaultFormErrorMessage } from "../../../../constants/applicationConstants";
import { AuthContext } from "../../../../contexts/AuthContext";
import Notify from "../../../../hooks/notifications/notifications";
import useAdoptionAlertByIdQuery from "../../../../queries/useAdoptionAlertByIdQuery";
import {
  GenerateAdoptionSharingPoster,
  ToggleAdoption,
  ToggleAdoptionAlertFavorite,
} from "../../../../services/requests/Alerts/Adoption/adoptionAlertService";
import { GenderEnum, PetResponse, RecentlyViewedPet } from "../../../../services/requests/Pets/types";
import { formatDateOnly } from "../../../../utils/dates";
import { formatColorNames } from "../../../../utils/formatters";
import AlertMap from "./components/AlertMap";
import ConsideringAdoption from "./components/ConsideringAdoption";
import OtherOptionsButton from "./components/OtherOptionsButton";
import OwnerData from "./components/OwnerData";
import PetCharacteristic from "./components/PetCharacteristic";
import ShareButton from "./components/ShareButton";

type Section = {
  name: string;
  value: string;
};

type PetCharacteristics = {
  leftSection: Section[];
  rightSection: Section[];
};

export default function IndividualAlert() {
  const [openedCarousel, setOpenedCarousel] = useState(false);
  const [indexInitialSlide, setIndexInitialSlide] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reportMessage, setReportMessage] = useState<FormNotification | null>(null);

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  const { alertId } = useParams();

  const { data } = useAdoptionAlertByIdQuery(alertId!);
  const [isAdopted, setIsAdopted] = useState<boolean | null>(null);

  const { isAuthenticated, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = useMantineTheme();

  const [reportContentOpened, { open: openReportContent, close: closeReportContent }] = useDisclosure(false);
  function handleImageClick(imageIndex: number) {
    setIndexInitialSlide(imageIndex);
    setOpenedCarousel(true);
  }

  const { mutateAsync: toggleAdoptionAlertFavoriteAsync } = useMutation({
    mutationFn: () => ToggleAdoptionAlertFavorite(data!.id),
    onError: (e) => {
      const error = e as AxiosError<ApiError>;
      Notify({ type: "error", message: error.response?.data.message ?? defaultFormErrorMessage });
      setIsFavorite((prevValue) => !prevValue);
    },
  });

  const { mutateAsync: generateAdoptionSharingPoster, isPending: loadingAdoptionPoster } = useMutation({
    mutationFn: () => GenerateAdoptionSharingPoster(data!.id),
    onSuccess: (poster: Blob) => {
      const downloadFile = () => {
        const url = URL.createObjectURL(poster);

        const link = document.createElement("a");
        link.href = url;
        const fileName = `adocao_${data?.pet.name.trim().toLowerCase()}.pdf`;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      };

      downloadFile();
    },
  });

  const getAdoptionSharingPoster = async () => {
    if (!data?.id) {
      return;
    }

    await generateAdoptionSharingPoster();
  };

  const handleToggleAdoptionFavorite = () => {
    if (isAdopted === null) {
      if (data?.adoptionDate) {
        setIsAdopted(false);
      } else {
        setIsAdopted(true);
      }
    } else {
      setIsAdopted((prevValue) => !prevValue);
    }
  };

  const { mutateAsync: toggleAdoptionAsync, isPending: loadingToggleAdoption } = useMutation({
    mutationFn: () => ToggleAdoption(data!.id),
    onSuccess: () => handleToggleAdoptionFavorite(),
    onError: (e) => {
      const error = e as AxiosError<ApiError>;
      Notify({ type: "error", message: error.response?.data.message ?? defaultFormErrorMessage });
      setIsFavorite((prevValue) => !prevValue);
    },
  });

  async function handleFavoriteAlert() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsFavorite((prevValue) => !prevValue);
    await toggleAdoptionAlertFavoriteAsync();
  }

  useEffect(() => {
    setIsFavorite(data?.isFavorite || false);
  }, [data?.isFavorite]);

  useEffect(() => {
    if (!data || !data.id) {
      return;
    }

    const petData: RecentlyViewedPet = {
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

  const isPetAdopted = () => {
    if (isAdopted === null) {
      return data?.adoptionDate !== null;
    }
    return isAdopted;
  };

  const getToggleAdoptionButtonText = () => {
    return isPetAdopted() ? "Remover confirmação de adoção" : "Confirmar adoção";
  };

  const otherOptionItems = [
    {
      leftSection: <HeartStraight weight={isFavorite ? "fill" : "regular"} size={20} color="red" />,
      text: isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos",
      onClick: handleFavoriteAlert,
    },
    {
      leftSection: <IconFileText size={20} className="text-[#4d4751]" />,
      text: "Gerar cartaz de adoção",
      onClick: getAdoptionSharingPoster,
    },
    {
      leftSection: <IconFlag size={20} className="text-[#4d4751]" />,
      text: "Denunciar adoção",
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

                {isPetAdopted() && !isMobile ? (
                  <Badge
                    rightSection={<Confetti size={18} />}
                    size="lg"
                    variant="filled"
                    color={theme.colors["brand-orange"][6]}
                    className="w-fit truncate border border-white"
                  >
                    Adotado
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-col justify-center lg:flex-row lg:gap-5">
                <div className="flex gap-2 justify-center">
                  {isOwnerOfAlert && !isMobile ? (
                    <Button type="button" onClick={() => toggleAdoptionAsync()} loading={loadingToggleAdoption}>
                      {getToggleAdoptionButtonText()}
                    </Button>
                  ) : null}

                  {isOwnerOfAlert && (
                    <Link to={`/adocoes/editar/${alertId}`}>
                      <Tooltip label="Editar" className="w-fit">
                        <Button className="w-fit p-0.5" variant="subtle">
                          <Pencil weight="duotone" className="text-[#4d4751]" size={30} />
                        </Button>
                      </Tooltip>
                    </Link>
                  )}

                  <ShareButton petName={data.pet.name} petGender={data.pet.gender} />

                  <OtherOptionsButton items={getOtherOptionsItems()} loading={loadingAdoptionPoster} />
                </div>
              </div>
            </div>

            {isPetAdopted() && isMobile ? (
              <div className="mt-2">
                <Badge
                  rightSection={<Confetti size={18} />}
                  size="lg"
                  variant="filled"
                  color={theme.colors["brand-orange"][6]}
                  className="w-full truncate border mb-1 border-white"
                >
                  Adotado
                </Badge>
              </div>
            ) : null}

            {isOwnerOfAlert && isMobile ? (
              <div className="flex w-full h-fit md:justify-end">
                <Button
                  type="button"
                  onClick={() => toggleAdoptionAsync()}
                  loading={loadingToggleAdoption}
                  className="mt-1 mb-1.5 w-full md:w-fit"
                >
                  {getToggleAdoptionButtonText()}
                </Button>
              </div>
            ) : null}

            {isPetAdopted() && (
              <div className="flex gap-1.5 mt-2 md:mt-3 mb-0.5">
                <CalendarDots size={20} />
                <span>
                  {data.pet.gender.id === GenderEnum.Male ? "Adotado em" : "Adotada em"}{" "}
                  {formatDateOnly(data.adoptionDate)}
                </span>
              </div>
            )}

            <div className={`flex gap-1.5 ${isPetAdopted() ? "mt-1" : "mt-2 md:mt-3"}`}>
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

            {data.adoptionForm?.fileUrl && data.adoptionForm?.fileName && (
              <div className="mt-5">
                <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />

                <Title order={3} className="uppercase mb-1.5">
                  Formulário de adoção
                </Title>

                <AttachmentFile
                  file={data.adoptionForm.fileUrl}
                  fileName={data.adoptionForm.fileName}
                  downloadWhenClicked
                />
              </div>
            )}

            {data.adoptionRestrictions.length > 0 ? (
              <div className="mt-5">
                <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />
                <Title order={3} className="uppercase mb-1.5">
                  Restrições da adoção
                </Title>
                <ul className="ml-6">
                  {data.adoptionRestrictions.map((restriction) => (
                    <li className="list-disc" key={restriction}>
                      {restriction}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5">
              <Divider size="md" my="xs" color={theme.colors["brand-blue"][6]} />
              <Title order={3} className="uppercase mb-1.5">
                Local
              </Title>
              <AlertMap
                alertCoordinates={
                  data.locationLatitude && data.locationLongitude
                    ? [data?.locationLatitude, data?.locationLongitude]
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
          </div>
          {!isOwnerOfAlert ? (
            <div className="flex flex-col gap-5 w-full lg:max-w-[350px] h-fit mb-6 lg:mb-0">
              <ConsideringAdoption
                alertId={data.id}
                ownerPhoneNumber={data.owner.phoneNumber}
                petName={data.pet.name}
              />
              <OwnerData owner={data.owner} petName={data.pet.name} />
            </div>
          ) : null}
        </div>
      </main>

      <Modal opened={reportContentOpened} onClose={closeReportContent} centered withCloseButton={false}>
        <ReportContent alertId={data.id} closeModal={closeReportContent} setReportMessage={setReportMessage} />
      </Modal>
    </>
  );
}
