import { Button, Card, Text, Title } from "@mantine/core";
import { IconBrandWhatsapp, IconMessage } from "@tabler/icons-react";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../../../components/Chat/Chat";
import { AuthContext } from "../../../../contexts/AuthContext";
import usePaginatedUserConversations from "../../../../queries/usePaginatedUserMessagesQuery";
import { UserDataOnlyResponse } from "../../../../services/requests/User/types";

interface FoundAnimalContactProps {
  ownerData: UserDataOnlyResponse;
  ownerPhoneNumber: string | null;
  animalName: string;
}

export default function FoundAnimalContact({
  ownerData,
  ownerPhoneNumber,
  animalName,
}: Readonly<FoundAnimalContactProps>) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [userToMessage, setUserToMessage] = useState<UserDataOnlyResponse | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const { loadingFirstPage, userMessages } = usePaginatedUserConversations(
    userToMessage?.id ?? null,
    isAuthenticated,
    ref,
  );

  const handleChatWithAlertOwner = () => {
    if (isAuthenticated) {
      setUserToMessage(ownerData);
    } else {
      navigate("/login");
    }
  };

  const closeChat = () => {
    setUserToMessage(null);
  };

  const handleWhatsAppContact = () => {
    if (!ownerPhoneNumber) return;

    const message = `Olá! Vi o alerta sobre ${animalName} no AcheMeuPet. Gostaria de conversar sobre o animal encontrado.`;
    const whatsappUrl = `https://wa.me/${ownerPhoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Title order={4} className="mb-3">
          Este é seu pet?
        </Title>
        <Text size="sm" c="dimmed" className="mb-4">
          Entre em contato com quem encontrou o animal para mais informações.
        </Text>

        <div className="flex flex-col gap-3">
          <Button
            fullWidth
            leftSection={<IconMessage size={20} />}
            onClick={handleChatWithAlertOwner}
            className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue-hover)]"
          >
            Enviar mensagem
          </Button>

          {ownerPhoneNumber && (
            <Button
              fullWidth
              leftSection={<IconBrandWhatsapp size={20} />}
              onClick={handleWhatsAppContact}
              color="green"
            >
              Contatar via WhatsApp
            </Button>
          )}
        </div>
      </Card>

      {userToMessage && (
        <Chat
          close={closeChat}
          loading={loadingFirstPage}
          userName={ownerData.fullName}
          userId={ownerData.id}
          messages={userMessages ?? []}
          ref={ref}
        />
      )}
    </>
  );
}
