import { UserMessageResponse } from "../../../services/requests/UserMessages/types";
import { formatToHoursAndMinutes } from "../../../utils/dates";

interface OtherUserMessageProps {
  message: UserMessageResponse;
  idx: number;
  shouldShowMessageDate: (message: UserMessageResponse, idx: number) => boolean;
}

export default function OtherUserMessage({ message, idx, shouldShowMessageDate }: Readonly<OtherUserMessageProps>) {
  return (
    <div className="flex gap-2.5 message" data-date={message.timeStampUtc}>
      <img src={message.receiver?.image} alt="Foto de perfil do usuário" className="w-14 h-14 rounded-full" />
      <div>
        <h5 className="text-gray-900 text-sm font-semibold leading-snug pb-1">{message.sender?.fullName}</h5>
        <div className="w-max grid">
          <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
            <h5 className="text-gray-900 text-sm font-normal leading-snug">{message.content}</h5>
          </div>
          {shouldShowMessageDate(message, idx) ? (
            <div className="justify-end items-center inline-flex mb-1">
              <h6 className="text-gray-500 text-xs font-normal leading-4 py-1">
                {formatToHoursAndMinutes(message.timeStampUtc)}
              </h6>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
