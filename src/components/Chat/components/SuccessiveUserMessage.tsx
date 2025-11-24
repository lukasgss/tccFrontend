import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserMessageResponse } from "../../../services/requests/UserMessages/types";
import OtherUserMessage from "./OtherUserMessage";
import OwnMessage from "./OwnMessage";

interface SuccessiveUserMessageProps {
  message: UserMessageResponse;
  idx: number;
  shouldShowMessageDate: (message: UserMessageResponse, idx: number) => boolean;
}

export default function SuccessiveUserMessage({
  message,
  idx,
  shouldShowMessageDate,
}: Readonly<SuccessiveUserMessageProps>) {
  const { userData } = useContext(AuthContext);

  if (userData?.id === message.sender?.id) {
    return (
      <OwnMessage
        idx={idx}
        message={message}
        isFirstMessageOfUser={false}
        shouldShowMessageDate={shouldShowMessageDate}
      />
    );
  }

  return <OtherUserMessage idx={idx} message={message} shouldShowMessageDate={shouldShowMessageDate} />;
}
