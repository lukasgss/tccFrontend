import { Drawer, Text, Title } from "@mantine/core";
import { SmileyMeh } from "@phosphor-icons/react";
import { UserConversation } from "../../../services/requests/UserMessages/types";
import DefaultError from "../../Common/Errors/DefaultError";
import { SelectedConversation } from "../types";
import SkeletonConversations from "./SkeletonConversations";

interface ConversationProps {
  conversations: UserConversation[];
  opened: boolean;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
  getUserMessages: (conversations: SelectedConversation) => void;
}

export default function Conversations({
  conversations,
  opened,
  isLoading,
  isError,
  onClose,
  getUserMessages,
}: Readonly<ConversationProps>) {
  const handleConversationClick = (chat: UserConversation) => {
    getUserMessages({
      userId: chat.userId,
      userImageUrl: chat.userImageUrl,
      userName: chat.userName,
    });
  };

  const getConversationsContent = () => {
    if (conversations.length === 0) {
      return (
        <div className="flex flex-col items-center mt-5">
          <SmileyMeh size={42} />
          <Text className="text-center">Você ainda não possui nenhuma conversa...</Text>
          <Text fw={700} className="mt-2">
            Que tal ser mais ativo na plataforma?
          </Text>
        </div>
      );
    }

    return conversations.map((conversation) => (
      <button
        key={conversation.userId}
        type="button"
        className="flex gap-1.5 items-center hover:bg-gray-100 rounded-xl p-2"
        onClick={() => handleConversationClick(conversation)}
      >
        <img className="h-8 w-8 rounded-full" src={conversation.userImageUrl} alt="Imagem de perfil do usuário" />
        <div className="ml-2 text-sm font-semibold">{conversation.userName}</div>
        {conversation.newMessagesQuantity > 0 ? (
          <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-5 w-5 rounded-full leading-none">
            {conversation.newMessagesQuantity}
          </div>
        ) : null}
      </button>
    ));
  };

  if (isError) {
    return (
      <Drawer opened={opened} onClose={onClose} position="right" size="xs">
        <div className="flex flex-row items-center justify-between text-xs mt-5">
          <Title order={4} className="font-bold">
            Conversas
          </Title>
        </div>
        <div className="mt-5">
          <DefaultError size="xl" />
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer opened={opened} onClose={onClose} position="right" size="xs">
      <div className="flex flex-row items-center justify-between text-xs mt-5">
        <Title order={4} className="font-bold">
          Conversas
        </Title>

        {!isLoading && (
          <span className="flex items-center justify-center bg-gray-300 h-6 w-6 rounded-full text-lg">
            {conversations.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <SkeletonConversations />
      ) : (
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">{getConversationsContent()}</div>
      )}
    </Drawer>
  );
}
