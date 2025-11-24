import { Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Chats } from "@phosphor-icons/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import useMessageNotificationsAmount from "../../../queries/useMessageNotificationsAmountQuery";
import usePaginatedUserConversations from "../../../queries/usePaginatedUserMessagesQuery";
import useUserConversations from "../../../queries/useUserConversationsQuery";
import Chat from "../Chat";
import { SelectedConversation } from "../types";
import Conversations from "./Conversations";

export default function ConversationsSidebar() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);
  const [messagesHaveBeenRead, setMessagesHaveBeenRead] = useState(false);

  const {
    data: userConversations,
    isPending: loadingConversations,
    failureCount,
    refetch: updateConversationsData,
  } = useUserConversations(isAuthenticated);

  const isConversationsError = failureCount > 0;

  const ref = useRef<HTMLDivElement | null>(null);
  const { loadingFirstPage, userMessages, refetch } = usePaginatedUserConversations(
    selectedConversation?.userId ?? null,
    isAuthenticated,
    ref,
  );

  const { data: notificationsAmount, refetch: updateNotificationsAmount } =
    useMessageNotificationsAmount(isAuthenticated);

  const getMessagesFromConversation = async (conversation: SelectedConversation) => {
    setSelectedConversation(conversation);
    close();
  };

  const handleOpenConversationsSidebar = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      open();
    }
  };

  const handleCloseSelectedConversation = () => {
    setSelectedConversation(null);
  };

  useEffect(() => {
    if (messagesHaveBeenRead) {
      updateNotificationsAmount();
      updateConversationsData();
    }
  }, [messagesHaveBeenRead, updateConversationsData, updateNotificationsAmount]);

  useEffect(() => {
    if (selectedConversation) {
      refetch();
    }
  }, [refetch, selectedConversation]);

  return (
    <>
      {!selectedConversation && (
        <div className="fixed bottom-2 right-4">
          <div className="relative">
            <UnstyledButton onClick={handleOpenConversationsSidebar} aria-label="Conversas do usuário">
              <div className="bg-[var(--primary-orange)] hover:bg-[var(--primary-orange-hover)] p-4 rounded-full">
                <Chats size={32} color="white" />
              </div>
              {notificationsAmount && notificationsAmount.amount > 0 ? (
                <div className="absolute top-0 right-0 bg-red-500 rounded-full py-0.5 px-2 text-white">
                  <Text size="sm" c="white">
                    {notificationsAmount?.amount}
                  </Text>
                </div>
              ) : null}
            </UnstyledButton>
          </div>
        </div>
      )}

      {userConversations || isConversationsError ? (
        <Conversations
          conversations={userConversations ?? []}
          isLoading={loadingConversations}
          isError={isConversationsError}
          opened={opened}
          onClose={close}
          getUserMessages={getMessagesFromConversation}
        />
      ) : null}

      {selectedConversation && (
        <Chat
          messages={userMessages ?? []}
          loading={loadingFirstPage}
          close={handleCloseSelectedConversation}
          userName={selectedConversation.userName}
          userId={selectedConversation.userId}
          setMessagesHaveBeenRead={setMessagesHaveBeenRead}
          ref={ref}
        />
      )}
    </>
  );
}
