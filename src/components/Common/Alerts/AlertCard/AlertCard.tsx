import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Group,
  Image,
  Loader,
  Menu,
  Text,
  Title,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconMessage, IconShare } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

import { HeartStraight } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import classes from "./AlertCard.module.css";

import { AuthContext } from "../../../../contexts/AuthContext";
import Notify from "../../../../hooks/notifications/notifications";
import usePaginatedUserConversations from "../../../../queries/usePaginatedUserMessagesQuery";
import { ToggleAdoptionAlertFavorite } from "../../../../services/requests/Alerts/Adoption/adoptionAlertService";
import { PetResponseNoOwner } from "../../../../services/requests/Pets/types";
import { UserDataOnlyResponse } from "../../../../services/requests/User/types";
import getErrorMessage from "../../../../utils/errorHandler";
import Chat from "../../../Chat/Chat";
import ShareDropdown from "../../Share/ShareDropdown";
import { AlertTypes } from "../../../../pages/Home/components/AlertCard";
import { ToggleFoundAlertFavorite } from "../../../../services/requests/Alerts/Found/foundAlertsService";
import { ToggleMissingAlertFavorite } from "../../../../services/requests/Alerts/Missing/missingAlertsService";
import { getAlertWhatsappMessage, getShareAlertMessage } from "../../../../utils/shareContent";

interface AlertCardProps {
  type: AlertTypes;
  alertId: string;
  owner: UserDataOnlyResponse;
  pet: PetResponseNoOwner;
  isFavorite: boolean;
  showIsFavorite?: boolean;
  showMessageOwner?: boolean;
  toggleAlertFavorite?: (alertId: string) => void;
}

export default function AlertCard({
  type,
  alertId,
  owner,
  pet,
  isFavorite,
  showIsFavorite = true,
  showMessageOwner = true,
  toggleAlertFavorite,
}: Readonly<AlertCardProps>) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [userToMessage, setUserToMessage] = useState<UserDataOnlyResponse | null>(null);

  const {
    mutateAsync: toggleAdoptionAlertFavoriteAsync,
    isPending: adoptionPending,
    isError: adoptionError,
  } = useMutation({
    mutationFn: () => ToggleAdoptionAlertFavorite(alertId),
    onSuccess: () => {
      toggleAlertFavorite?.(alertId);
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
    onError: (e) => {
      const errorMessage = getErrorMessage(e);
      Notify({ type: "error", message: errorMessage });
    },
  });

  const {
    mutateAsync: toggleFoundAlertFavoriteAsync,
    isPending: foundPending,
    isError: foundError,
  } = useMutation({
    mutationFn: () => ToggleFoundAlertFavorite(alertId),
    onSuccess: () => {
      toggleAlertFavorite?.(alertId);
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
    onError: (e) => {
      const errorMessage = getErrorMessage(e);
      Notify({ type: "error", message: errorMessage });
    },
  });

  const {
    mutateAsync: toggleMissingAlertFavoriteAsync,
    isPending: missingPending,
    isError: missingError,
  } = useMutation({
    mutationFn: () => ToggleMissingAlertFavorite(alertId),
    onSuccess: () => {
      toggleAlertFavorite?.(alertId);
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
    onError: (e) => {
      const errorMessage = getErrorMessage(e);
      Notify({ type: "error", message: errorMessage });
    },
  });

  async function handleFavoriteAlert(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (type === "adoption") {
      await toggleAdoptionAlertFavoriteAsync();
    } else if (type === "found") {
      await toggleFoundAlertFavoriteAsync();
    } else if (type === "missing") {
      await toggleMissingAlertFavoriteAsync();
    }
  }

  const ref = useRef<HTMLDivElement | null>(null);
  const { loadingFirstPage, userMessages } = usePaginatedUserConversations(
    userToMessage?.id ?? null,
    isAuthenticated,
    ref,
  );

  const handleChatWithAlertOwner = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (isAuthenticated) {
      setUserToMessage(owner);
    } else {
      navigate("/login");
    }
  };

  const closeChat = () => {
    setUserToMessage(null);
  };

  const urlMappings: Record<AlertTypes, string> = {
    adoption: "adocoes",
    found: "encontrados",
    missing: "perdidos",
  };
  const alertUrl = `/${urlMappings[type]}/${alertId}`;

  return (
    <>
      <Link to={alertUrl} className="hover:outline outline-[var(--primary-blue)] rounded-md w-fit">
        <Card withBorder radius="md" shadow="lg" className={classes.card}>
          <Card.Section>
            <Image
              className="bg-cover h-[300px]"
              src={pet.images[0]}
              alt="Animal disponível para adoção"
              height={180}
            />
          </Card.Section>

          <Tooltip label={pet.name || "Animal sem nome"}>
            <Title fw={500} order={3} className={`${classes.title} truncate`}>
              {pet.name || "Animal sem nome"}
            </Title>
          </Tooltip>

          <Tooltip
            label={`${pet.gender?.name || "Gênero desconhecido"} · ${pet.age?.name || "Idade desconhecida"} · ${pet.breed?.name || "Raça desconhecida"}`}
          >
            <Text ta="center" className="truncate">
              {pet.gender?.name || "Gênero desconhecido"} <span className="text-black">·</span>{" "}
              {pet.age?.name || "Idade desconhecida"}
              <span className="text-black"> ·</span> {pet.breed?.name || "Raça desconhecida"}
            </Text>
          </Tooltip>

          <Group justify="space-between" className={classes.footer}>
            <Center>
              <Avatar src={owner.image} alt="Imagem de perfil do criador do alerta" size={24} radius="xl" mr="xs" />
              <Text fz="sm" inline>
                {owner.fullName}
              </Text>
            </Center>

            {userData?.id !== owner.id ? (
              <Group gap={8} mr={0}>
                {showMessageOwner && (
                  <Tooltip label="Enviar mensagem pela plataforma ao criador do alerta">
                    <ActionIcon
                      variant="light"
                      className={classes.action}
                      onClick={(e) => handleChatWithAlertOwner(e)}
                      aria-label="Enviar mensagem ao criador do alerta"
                    >
                      <IconMessage style={{ width: rem(16), height: rem(16) }} color={theme.colors.gray[9]} />
                    </ActionIcon>
                  </Tooltip>
                )}
                <Menu transitionProps={{ transition: "pop" }} withArrow position="bottom-end" withinPortal>
                  <Menu.Target>
                    <ActionIcon
                      variant="light"
                      className={classes.action}
                      onClick={(e) => e.preventDefault()}
                      aria-label="Compartilhar"
                    >
                      <Tooltip label="Compartilhar">
                        <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
                      </Tooltip>
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown className="shadow">
                    <ShareDropdown
                      whatsappMessage={getAlertWhatsappMessage(type, pet.gender?.name ?? null, pet.name, alertUrl)}
                      twitterMessage={getShareAlertMessage(type, pet.gender?.name ?? null, pet.name)}
                    />
                  </Menu.Dropdown>
                </Menu>
                {showIsFavorite ? (
                  <Tooltip label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
                    <ActionIcon
                      variant="light"
                      className={classes.action}
                      onClick={(e) => handleFavoriteAlert(e)}
                      aria-label="Alternar entre favorito e não favorito"
                    >
                      {(adoptionPending && !adoptionError) ||
                      (foundPending && !foundError) ||
                      (missingPending && !missingError) ? (
                        <Loader size={16} />
                      ) : (
                        <HeartStraight
                          style={{ width: rem(16), height: rem(16) }}
                          weight={isFavorite ? "fill" : "regular"}
                          color={theme.colors.red[6]}
                        />
                      )}
                    </ActionIcon>
                  </Tooltip>
                ) : null}
              </Group>
            ) : null}
          </Group>
        </Card>
      </Link>
      {userToMessage && (
        <Chat
          close={closeChat}
          loading={loadingFirstPage}
          userName={owner.fullName}
          userId={owner.id}
          messages={userMessages ?? []}
          ref={ref}
        />
      )}
    </>
  );
}
