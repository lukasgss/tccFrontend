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
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import classes from "./AlertCard.module.css";

import { AuthContext } from "../../../../contexts/AuthContext";
import Notify from "../../../../hooks/notifications/notifications";
import { ToggleAdoptionAlertFavorite } from "../../../../services/requests/Alerts/Adoption/adoptionAlertService";
import { PetResponseNoOwner } from "../../../../services/requests/Pets/types";
import { UserDataOnlyResponse } from "../../../../services/requests/User/types";
import getErrorMessage from "../../../../utils/errorHandler";
import { getAdoptionAlertWhatsappMessage, getShareAdoptionAlertMessage } from "../../../../utils/shareContent";
import ShareDropdown from "../../Share/ShareDropdown";

interface AlertCardProps {
  alertId: string;
  owner: UserDataOnlyResponse;
  pet: PetResponseNoOwner;
  isFavorite: boolean;
  showIsFavorite?: boolean;
  showMessageOwner?: boolean;
  toggleAlertFavorite?: (alertId: string) => void;
}

export default function AlertCard({
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
  const { isAuthenticated } = useContext(AuthContext);

  const {
    mutateAsync: toggleAdoptionAlertFavoriteAsync,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () => ToggleAdoptionAlertFavorite(alertId),
    onSuccess: () => toggleAlertFavorite?.(alertId),
    onError: (e) => {
      const errorMessage = getErrorMessage(e);
      Notify({ type: "error", message: errorMessage });
    },
  });

  async function handleFavoriteAlert(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
    }

    await toggleAdoptionAlertFavoriteAsync();
  }

  const handleChatWithAlertOwner = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (isAuthenticated) {
      // TODO: Chat
    } else {
      navigate("/login");
    }
  };

  const alertUrl = `/adocoes/${alertId}`;

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

          <Tooltip label={pet.name}>
            <Title fw={500} order={3} className={`${classes.title} truncate`}>
              {pet.name}
            </Title>
          </Tooltip>

          <Tooltip label={`${pet.gender.name} · ${pet.age.name} · ${pet.breed.name}`}>
            <Text ta="center" className="truncate">
              {pet.gender.name} <span className="text-black">·</span> {pet.age.name}
              <span className="text-black"> ·</span> {pet.breed.name}
            </Text>
          </Tooltip>

          <Group justify="space-between" className={classes.footer}>
            <Center>
              <Avatar src={owner.image} alt="Imagem de perfil do criador do alerta" size={24} radius="xl" mr="xs" />
              <Text fz="sm" inline>
                {owner.fullName}
              </Text>
            </Center>

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
                    whatsappMessage={getAdoptionAlertWhatsappMessage(pet.gender.name, pet.name, alertUrl)}
                    twitterMessage={getShareAdoptionAlertMessage(pet.gender.name, pet.name)}
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
                    {isPending && !isError ? (
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
          </Group>
        </Card>
      </Link>
    </>
  );
}
