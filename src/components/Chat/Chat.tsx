import { ActionIcon, Button, TextInput, Title, Tooltip } from "@mantine/core";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import { Dispatch, forwardRef, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Notify from "../../hooks/notifications/notifications";
import { UserMessageResponse } from "../../services/requests/UserMessages/types";
import { addMinutes, formatISODate } from "../../utils/dates";
import getErrorMessage from "../../utils/errorHandler";
import DateBeingLookedAt from "./components/DateBeingLookedAt";
import FirstUserMessage from "./components/FirstUserMessage";
import LoadingChat from "./components/LoadingChat";
import SuccessiveUserMessage from "./components/SuccessiveUserMessage";

interface ChatProps {
  messages: UserMessageResponse[];
  userName: string;
  userId: string;
  loading: boolean;
  close: () => void;
  setMessagesHaveBeenRead?: Dispatch<SetStateAction<boolean>>;
}

const { VITE_API_BASE_URL } = import.meta.env;
const MESSAGE_TIME_THRESOLD_IN_MINUTES = 5;

const Chat = forwardRef<HTMLDivElement, Readonly<ChatProps>>(
  ({ messages, userName, userId, loading, close, setMessagesHaveBeenRead }, ref) => {
    const { accessToken } = useContext(AuthContext);

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [messageInput, setMessageInput] = useState("");
    const [connectionStarted, setConnectionStarted] = useState(false);

    const [realTimeMessages, setRealTimeMessages] = useState<UserMessageResponse[]>([]);

    const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    const isFirstMessageOfUser = (message: UserMessageResponse, idx: number) => {
      return messages[idx - 1]?.sender?.id !== message.sender?.id;
    };

    const isFirstMessageOfUserRealtime = (message: UserMessageResponse) => {
      return messages[messages.length - 1]?.sender?.id !== message.sender?.id;
    };

    const shouldShowMessageDate = (message: UserMessageResponse, idx: number) => {
      const date = new Date(message.timeStampUtc);
      const nextMessageDate = new Date(messages[idx + 1]?.timeStampUtc);

      const dateThreshold = addMinutes(date, MESSAGE_TIME_THRESOLD_IN_MINUTES);

      return (
        messages[idx - 1]?.sender?.id !== message.sender?.id ||
        messages[idx + 1]?.sender?.id !== message.sender?.id ||
        nextMessageDate > dateThreshold
      );
    };

    const shouldShowRealTimeMessageDate = (message: UserMessageResponse, idx: number) => {
      return (
        realTimeMessages[idx - 1]?.sender?.id !== message.sender?.id ||
        realTimeMessages[idx + 1]?.sender?.id !== message.sender?.id
      );
    };

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = useCallback(() => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView();
      }, 0);
    }, []);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [realTimeMessages]);

    const sendMessage = async () => {
      try {
        if (messageInput === "") {
          return;
        }

        if (connection && connectionStarted) {
          setMessageInput("");
          await connection.invoke("SendMessage", userId, messageInput);
        }
      } catch (e) {
        Notify({
          type: "error",
          message: getErrorMessage(e as Error) ?? "Ocorreu um erro ao enviar a mensagem, tente novamente.",
        });
      }
    };

    useEffect(() => {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              setVisibleMessage(target.dataset.date ?? null);
            }
          });
        },
        {
          threshold: 1,
        },
      );

      const messageElements = document.querySelectorAll(".message");
      messageElements.forEach((el) => observer.current?.observe(el));

      return () => {
        messageElements.forEach((el) => observer.current?.unobserve(el));
      };
    }, [messages, realTimeMessages]);

    useEffect(() => {
      const readMsgs = async () => {
        setMessagesHaveBeenRead?.(true);
      };
      readMsgs();

      return () => setMessagesHaveBeenRead?.(false);
    }, []);

    useEffect(() => {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${VITE_API_BASE_URL}/chat-hub`, {
          accessTokenFactory: () => accessToken!,
        })
        .configureLogging(LogLevel.None)
        .build();

      newConnection.on("ReceiveMessage", (message: UserMessageResponse) => {
        setRealTimeMessages((prevValues) => [...prevValues, message]);
        scrollToBottom();
      });

      setConnection(newConnection);

      return () => {
        newConnection.stop();
        setConnectionStarted(false);
      };
    }, [accessToken, scrollToBottom]);

    useEffect(() => {
      if (connection) {
        setConnectionStarted(true);
        connection.start();
      }
    }, [connection]);

    const [scrollTop, setScrollTop] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
      const scrollableElement = (ref as React.RefObject<HTMLDivElement>).current;

      const handleScroll = () => {
        if (scrollableElement) {
          setScrollTop(scrollableElement.scrollTop);
        }
      };

      if (scrollableElement) {
        setScrollTop(scrollableElement.scrollTop);
        setContentHeight(scrollableElement.scrollHeight);

        scrollableElement.addEventListener("scroll", handleScroll);
      }

      return () => {
        if (scrollableElement) {
          scrollableElement.removeEventListener("scroll", handleScroll);
        }
      };
    }, [ref]);

    useEffect(() => {
      const scrollableElement = (ref as React.RefObject<HTMLDivElement>).current;

      if (scrollableElement) {
        const previousContentHeight = contentHeight;
        const newContentHeight = scrollableElement.scrollHeight;

        if (newContentHeight > previousContentHeight) {
          const heightDifference = newContentHeight - previousContentHeight;
          scrollableElement.scrollTop = scrollTop + heightDifference + 40;
        }

        setContentHeight(scrollableElement.scrollHeight);
      }
    }, [scrollTop, contentHeight, messages, ref]);

    const getDateBeingLookedAt = () => {
      const dateBeingLookedAt = new Date(visibleMessage as string);
      const todaysDate = new Date();
      if (visibleMessage === null || dateBeingLookedAt.getDate() === todaysDate.getDate()) {
        return null;
      }

      if (todaysDate.getDate() - 1 === dateBeingLookedAt.getDate()) {
        return "Ontem";
      }

      return formatISODate(visibleMessage);
    };

    const dateBeingLookedAt = getDateBeingLookedAt();

    if (loading) {
      return (
        <div className="w-screen h-screen md:w-96 md:h-96 bottom-0 fixed right-0 md:bottom-2 rounded bg-white overflow-y-scroll shadow z-50">
          <div
            className="sticky top-0 z-50 flex items-center justify-between
          pt-1 mb-3 pl-5 pr-1 bg-[var(--primary-blue)]"
          >
            <Title order={6} c="white">
              {userName}
            </Title>
            <Tooltip label="Fechar conversa">
              <ActionIcon onClick={close} variant="outline" c="white">
                <X size={20} />
              </ActionIcon>
            </Tooltip>
          </div>

          <LoadingChat />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="w-screen h-screen bottom-0 rounded-none mt-10 md:w-96 md:h-96 fixed right-0 md:bottom-2
          md:rounded bg-white overflow-y-scroll shadow z-[9999]"
      >
        <div
          className="sticky top-0 z-50 flex items-center justify-between
          pt-1 mb-3 pl-5 pr-1 bg-[var(--primary-blue)]"
        >
          <Title order={6} c="white">
            {userName}
          </Title>
          <Tooltip label="Fechar conversa">
            <ActionIcon onClick={close} variant="outline" c="white">
              <X size={20} />
            </ActionIcon>
          </Tooltip>
        </div>
        <DateBeingLookedAt date={dateBeingLookedAt} />

        <div className="relative mb-10">
          <div className="grid">
            <div className="flex flex-col gap-1">
              {messages.map((message, idx) =>
                isFirstMessageOfUser(message, idx) ? (
                  <FirstUserMessage
                    key={message.id}
                    message={message}
                    idx={idx}
                    shouldShowMessageDate={shouldShowMessageDate}
                  />
                ) : (
                  <SuccessiveUserMessage
                    key={message.id}
                    message={message}
                    idx={idx}
                    shouldShowMessageDate={shouldShowMessageDate}
                  />
                ),
              )}

              {realTimeMessages.map((message, idx) =>
                isFirstMessageOfUserRealtime(message) ? (
                  <FirstUserMessage
                    key={message.id}
                    message={message}
                    idx={idx}
                    shouldShowMessageDate={shouldShowRealTimeMessageDate}
                  />
                ) : (
                  <SuccessiveUserMessage
                    key={message.id}
                    message={message}
                    idx={idx}
                    shouldShowMessageDate={shouldShowRealTimeMessageDate}
                  />
                ),
              )}
            </div>
          </div>
          <div className="fixed bg-white flex bottom-2 px-2 py-1 items-center gap-2 justify-between w-[370px]">
            <form
              className="bg-white flex gap-2 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <TextInput
                className="flex-1 grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                placeholder="Digite aqui..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Button
                  onClick={sendMessage}
                  type="button"
                  className={`items-center flex px-3 py-2 rounded-full shadow
                   ${!messageInput ? "bg-gray-200 text-black cursor-not-allowed hover:bg-gray-200" : "bg-indigo-600"}`}
                >
                  <PaperPlaneTilt size={16} className={messageInput ? "text-white" : "text-black"} />
                  <h3
                    className={`text-xs font-semibold leading-4 px-2
                  ${!messageInput ? "text-black" : "text-white"}`}
                  >
                    Enviar
                  </h3>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
    );
  },
);

export default Chat;
