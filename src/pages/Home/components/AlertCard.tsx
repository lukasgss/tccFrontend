import { ActionIcon, Badge, Card, Image, Loader, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { HeartStraight, HeartStraightBreak } from "@phosphor-icons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToggleAdoptionAlertFavorite } from "../../../services/requests/Alerts/Adoption/adoptionAlertService";
import { ToggleFoundAlertFavorite } from "../../../services/requests/Alerts/Found/foundAlertsService";
import { ToggleMissingAlertFavorite } from "../../../services/requests/Alerts/Missing/missingAlertsService";

export type AlertTypes = "adoption" | "found" | "missing";

interface AlertCardProps {
  alertId: string;
  name: string;
  image: string;
  breed: string;
  gender: string;
  type: AlertTypes;
  isFavorite?: boolean;
  ownerId: string;
}

export default function AlertCard({
  alertId,
  name,
  image,
  breed,
  gender,
  type,
  isFavorite = false,
  ownerId,
}: Readonly<AlertCardProps>) {
  const [hasBeenSaved, setHasBeenSaved] = useState(isFavorite);
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Sync local state with prop when it changes
  useEffect(() => {
    setHasBeenSaved(isFavorite);
  }, [isFavorite]);

  const redirectMapping: Record<AlertTypes, string> = {
    adoption: "/adocoes",
    found: "/encontrados",
    missing: "/perdidos",
  };

  const theme = useMantineTheme();

  const { mutateAsync: toggleAdoptionFavorite, isPending: isAdoptionPending } = useMutation({
    mutationFn: () => ToggleAdoptionAlertFavorite(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
  });

  const { mutateAsync: toggleFoundFavorite, isPending: isFoundPending } = useMutation({
    mutationFn: () => ToggleFoundAlertFavorite(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
  });

  const { mutateAsync: toggleMissingFavorite, isPending: isMissingPending } = useMutation({
    mutationFn: () => ToggleMissingAlertFavorite(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSavedAlerts"] });
      queryClient.invalidateQueries({ queryKey: ["suggestedAlerts"] });
    },
  });

  async function handleFavorite() {
    if (!isAuthenticated) {
      navigate("/registrar");
      return;
    }

    if (type === "adoption") {
      await toggleAdoptionFavorite();
    } else if (type === "found") {
      await toggleFoundFavorite();
    } else if (type === "missing") {
      await toggleMissingFavorite();
    }

    setHasBeenSaved((prevValue) => !prevValue);
  }

  function getIconLabelText() {
    if (hasBeenSaved) {
      return "Remover dos favoritos";
    }
    return "Adicionar aos favoritos";
  }

  const iconLabelText = getIconLabelText();

  function getToggleFavoriteIcon() {
    if (isAdoptionPending || isFoundPending || isMissingPending) {
      return <Loader size={20} color="red" />;
    }
    if (hasBeenSaved) {
      return <HeartStraightBreak size={28} color="red" />;
    }
    return <HeartStraight size={28} color="red" />;
  }

  const isOwner = userData?.id === ownerId;

  return (
    <Link to={`${redirectMapping[type]}/${alertId}`}>
      <Card
        withBorder
        shadow="md"
        padding={0}
        radius="md"
        className="relative w-72 h-92 border-[3px] border-gray-300 hover:border-[var(--primary-blue)]"
      >
        <div className="absolute top-2 left-2">
          <Badge
            size="md"
            variant="filled"
            className="w-fit max-w-32 truncate border border-white"
            style={{ border: `2px solid ${theme.colors.orange[8]}` }}
            color={theme.colors.orange[8]}
          >
            {gender}
          </Badge>
        </div>
        {!isOwner && (
          <div className="absolute w-full h-fit">
            <Tooltip label={iconLabelText}>
              <ActionIcon
                variant="default"
                radius="md"
                size={36}
                className="absolute top-3 right-3 bg-white brightness-90 hover:brightness-125 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault();
                  handleFavorite();
                }}
                aria-label="Alternar entre favorito e não favorito"
              >
                {getToggleFavoriteIcon()}
              </ActionIcon>
            </Tooltip>
          </div>
        )}
        <Card.Section>
          <Image src={image} alt={name} className="w-full h-72" />
        </Card.Section>

        <Card.Section my="md">
          <div className="flex justify-between items-center px-5">
            <Text
              fw={700}
              title={name}
              className="pr-1.5 text-xl tracking-wider flex-1 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {name}
            </Text>
            <Badge size="sm" variant="light" className="w-fit max-w-32 truncate">
              {breed}
            </Badge>
          </div>
        </Card.Section>
      </Card>
    </Link>
  );
}
