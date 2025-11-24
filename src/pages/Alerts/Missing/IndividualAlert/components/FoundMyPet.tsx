import { Button, Text, Title } from "@mantine/core";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../../../../components/Chat/Chat";
import { AuthContext } from "../../../../../contexts/AuthContext";
import usePaginatedUserConversations from "../../../../../queries/usePaginatedUserMessagesQuery";
import { UserDataOnlyResponse } from "../../../../../services/requests/User/types";

interface FoundMyPetProps {
  petName: string;
  ownerPhoneNumber: string;
  ownerData: UserDataOnlyResponse;
}

export default function FoundMyPet({ petName, ownerData }: Readonly<FoundMyPetProps>) {
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

  return (
    <>
      <div className="bg-white shadow-md rounded-md">
        <div className="p-6">
          <Title order={2}>Você viu {petName}?</Title>
          <Text className="mt-3 mb-4 text-gray-700">
            Se você tem informações sobre {petName}, entre em contato com o dono imediatamente.
          </Text>
          <Button variant="filled" className="rounded-full w-full mt-2 h-12" onClick={handleChatWithOwner}>
            Entrar em contato com o dono
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
