import { Button, Title } from "@mantine/core";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../../../../components/Chat/Chat";
import { AuthContext } from "../../../../../contexts/AuthContext";
import usePaginatedUserConversations from "../../../../../queries/usePaginatedUserMessagesQuery";
import { UserDataOnlyResponse } from "../../../../../services/requests/User/types";

interface ConsideringAdoptionProps {
  alertId: string;
  petName: string;
  ownerPhoneNumber: string;
  ownerData: UserDataOnlyResponse;
}

export default function ConsideringAdoption({ alertId, petName, ownerData }: Readonly<ConsideringAdoptionProps>) {
  const [messageUser, setMessageUser] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeChat = () => {
    setMessageUser(false);
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const { loadingFirstPage, userMessages } = usePaginatedUserConversations(ownerData?.id ?? null, isAuthenticated, ref);

  const handleChatWithOwner = () => {
    if (isAuthenticated) {
      setMessageUser(true);
    } else {
      navigate("/login");
    }
  };

  const handleLearnToAdoptThroughPlatform = () => {
    navigate("/adocoes/como-adotar", { state: { fromAlertId: alertId } });
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md">
        <div className="p-6">
          <Title order={2}>Considerando a adoção de {petName}?</Title>
          <Button variant="filled" className="rounded-full w-full mt-5 mb-3 h-12" onClick={handleChatWithOwner}>
            Entrar em contato com o dono
          </Button>
          <Button variant="outline" className="rounded-full w-full h-12" onClick={handleLearnToAdoptThroughPlatform}>
            Aprenda a adotar pela plataforma
          </Button>
        </div>
      </div>
      {messageUser && (
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
